import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Users } from 'src/app/shared/interfaces/users.interface';
import { UserP } from 'src/app/shared/models/userShort.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:Array<Users> = [];
  modalRef: BsModalRef;
  newName:string  = '';
  newEmail:string = '';
  newPassword:string = '';
  newUserForm:NgForm;
  newUser:UserP = {
    name:'',
    email:'',
    password:''
  }
  constructor( private usersServices: UsersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers();
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
  addUser():void{
    this.usersServices.addJSONUser(this.newUser).subscribe(
      () => {
        this.getUsers();
      }
    )
      this.resetNewUserForm();
  }
  resetNewUserForm():void{
    this.newUser = {
      name:'',
      email:'',
      password:''
    }
  }
}
