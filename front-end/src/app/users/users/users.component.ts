import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Users } from 'src/app/shared/interfaces/users.interface';
import { UserP } from 'src/app/shared/models/userShort.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import {NgForm} from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { User } from 'src/app/shared/models/users.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:Array<Users> = [];
  modalRef: BsModalRef;
  newNameAdm:string  = '';
  newUserNameAdm:string  = '';
  newUserNameUser:string  = '';
  newEmailAdm:string = '';
  newPasswordAdm:string = '';
  newNameUser:string  = '';
  newUserUs:string  = '';
  role:string  = '';
  newEmailUser:string = '';
  newPasswordUser:string = '';
  newUserAdmForm:NgForm;
  newUserUserForm:NgForm;
  newUserAdm:UserP = {
    name:'',
    username:'',
    email:'',
    password:'',
    roles:[]
  }
  newUserUser:UserP = {
    name:'',
    username:'',
    email:'',
    password:'',
    roles:["user"]
  }
  ifAdmin;
  ifUser;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  removeuser:Users;
  edituser:Users;

  editName:string = '';
  edituserName:string = '';
  editEmail:string = '';
  constructor( private usersServices: UsersService,
    private modalService: BsModalService,
    private notifyService : NotificationService){ }

  ngOnInit(): void {
    this.getUsers();
    this.ifAdmin = localStorage.getItem("admin");
    this.ifUser = localStorage.getItem("user");
  }
  private getUsers(): void{
    this.usersServices.getJSONUsers().subscribe(
      data => {
        this.users = data;
        this.users.sort(function(a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }); 
      },
      err =>{
        console.log(err);
      }
    )    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  deleteStorage(){
    localStorage.clear();
  }
  addUser():void{
    if(this.ifAdmin){
      this.newUserAdm.roles.push(this.role);
      this.usersServices.addJSONUser(this.newUserAdm).subscribe(
        () => {
          this.showToasterSuccess();
          this.getUsers();
        },
        err =>{
          console.log(err)
          this.showToasterError();
        }
      )
        this.resetNewUserForm();
    } else{
      this.usersServices.addJSONUser(this.newUserUser).subscribe(
        () => {
          this.showToasterSuccess();
          this.getUsers();
        },
        err =>{
          console.log(err)
          this.showToasterError();
        }
      )
        this.resetNewUserForm();
    }    
  }
  resetNewUserForm(){
    this.newUserAdm = {
      name:'',
      username:'',
      email:'',
      password:'',
      roles:[]
    }
    this.newUserUser = {
      name:'',
      username:'',
      email:'',
      password:'',
      roles:["user"]
    }
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("New user successfully added :)")
  }
  showToasterError(){
    this.notifyService.showError("Server not working. Please, try again later.")
  }
  openModalEdit(edit: TemplateRef<any>, user:Users) {
    this.modalRef2 = this.modalService.show(edit);
    this.edituser = user;
    this.editName = user.name;
    this.edituserName = user.username;
    this.editEmail = user.email;
  }

  saveEdit(){
    this.edituser.name = this.editName;
    this.edituser.username = this.edituserName;
    this.edituser.email = this.editEmail;

    this.usersServices.updateJSONUser(this.edituser).subscribe(
      () => {
        this.notifyService.showSuccess("User successfully updated :)")
        this.getUsers();
      }, 
      err => {
        this.showToasterError();
      }
    )
    this.modalRef2.hide();
  }
  
  openModalDel(del: TemplateRef<any>, user:Users) {
    this.modalRef3 = this.modalService.show(del);
    this.removeuser = user;
    console.log(this.removeuser)
  }
  deleteUser():void{
    this.usersServices.deleteJSONUser(this.removeuser.id).subscribe(
      () =>{
        this.notifyService.showSuccess("User successfully deleted!")
        this.getUsers();
      },
      err => {
        this.showToasterError();
      }
    );
    this.removeuser = null;
    this.modalRef3.hide();
  }


}

