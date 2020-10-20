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
  entitlements:string  = '';
  arr = [];
  newEmailUser:string = '';
  newPasswordUser:string = '';
  newUserAdmForm:NgForm;
  newUserUserForm:NgForm;
  newUserAdm:UserP = {
    name:'',
    username:'',
    email:'',
    password:'',
    entitlements:[],
    roles:[]
  }
  newUserUser:UserP = {
    name:'',
    username:'',
    email:'',
    password:'',
    entitlements:[],
    roles:["user"]
  }
  ifAdmin;
  ifUser;
  ifCanDelete;
  ifCanViewUsers;
  ifCanViewDetails;
  ifselectUser:boolean = false;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  removeuser:Users;

  constructor( private usersServices: UsersService,
    private modalService: BsModalService,
    private notifyService : NotificationService){ }

  ngOnInit(): void {
    this.getUsers();
    this.ifAdmin = localStorage.getItem("admin");
    this.ifUser = localStorage.getItem("user");
    this.ifUser = JSON.parse(this.ifUser);
    this.ifAdmin = JSON.parse(this.ifAdmin);
    if(this.ifUser != null){
      if(this.ifUser.user.entitlements.includes("can_delete_users")){
        this.ifCanDelete = true;
      } else{
        this.ifCanDelete = false;
      }
      if(this.ifUser.user.entitlements.includes("can_view_users")){
        this.ifCanViewUsers = true;
      } else{
        this.ifCanViewUsers = false;
      }
      if(this.ifUser.user.entitlements.includes("can_view_details")){
        this.ifCanViewDetails = true;
      } else{
        this.ifCanViewDetails = false;
      }
    }
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
      if(this.role == 'admin'){
        this.newUserAdm.entitlements = ["can_view_users","can_edit_users","can_delete_users","can_view_details","can_view_details_full","can_edit_users_full"];
      } else{
        this.newUserAdm.entitlements = this.arr;
      }
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
      entitlements:[],
      roles:[]
    }
    this.newUserUser = {
      name:'',
      username:'',
      email:'',
      password:'',
      entitlements:[],
      roles:["user"]
    }
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("New user successfully added :)")
  }
  showToasterError(){
    this.notifyService.showError("Server not working. Please, try again later.")
  }
  
  openModalDel(del: TemplateRef<any>, user:Users) {
    this.modalRef3 = this.modalService.show(del);
    this.removeuser = user;
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
  selected(val){
    this.arr.push(val);
  }
  getRole(){
    this.ifselectUser = true;
  }
  getRole1(){
    this.ifselectUser = false;
  }
}


