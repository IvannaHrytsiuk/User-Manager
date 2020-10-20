import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Users } from 'src/app/shared/interfaces/users.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';
import {NgForm} from '@angular/forms';
import { DeactGuard } from 'src/app/shared/guard/deact.guard';


@Component({
  selector: 'app-user-datails',
  templateUrl: './user-datails.component.html',
  styleUrls: ['./user-datails.component.scss']
})
export class UserDatailsComponent implements OnInit {

  viewUser:Users;
  modalRef: BsModalRef;

  edituser:Users;
  editName:string = '';
  edituserName:string = '';
  edituserent;
  editEmail:string = '';
  ifAdmin;
  ifUser;
  ifEditUser;
  ifCanEditUser;
  ifCanEditUsers;
  arrEnt;
  arr = [];

  constructor(private userService: UsersService, 
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private notifyService : NotificationService,
    private guarddeact: DeactGuard
    ) { }

  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.userService.get1User(id).subscribe(
        data =>{
          this.viewUser = data[0];
          this.arrEnt = this.viewUser.entitlements;
          this.arrEnt = this.arrEnt.replace('[', '').replace(']','').split(',')
        }
      )
    this.ifAdmin = localStorage.getItem("admin");
    this.ifUser = localStorage.getItem("user");
    this.ifEditUser = localStorage.getItem('user');
    this.ifEditUser = JSON.parse(this.ifEditUser)
    if(this.ifUser){
      if(this.ifEditUser.user.roles[0].user_roles.userId == id){
        this.ifCanEditUser = true;
      } else{
        this.ifCanEditUser = false;
      }
    }
    if(this.ifUser){
      if(this.ifEditUser.user.entitlements.includes('can_edit_users')){
        this.ifCanEditUsers = true;
      } else{
        this.ifCanEditUsers = false;
      }
    }
  }

  openModalEdit(edit: TemplateRef<any>) {
    this.guarddeact.confirmStatus = false;
    this.guarddeact.confirmStatus = true;
    this.modalRef = this.modalService.show(edit);
    this.edituser = this.viewUser;
    this.editName =  this.viewUser.name;
    this.edituserName =  this.viewUser.username;
    this.editEmail =  this.viewUser.email;
    this.edituserent =  this.viewUser.entitlements.toString().replace('[', '').replace(']','');
  }
  deleteStorage(){
    localStorage.clear();
  }
  saveEdit(){
    if(this.ifAdmin != null){
      this.edituser.name = this.editName;
      this.edituser.username = this.edituserName;
      this.edituser.email = this.editEmail;
      this.edituser.entitlements = this.edituserent;
  
      this.userService.updateJSONUser(this.edituser).subscribe(
        () => {
          this.notifyService.showSuccess("User successfully updated :)")
          this.ngOnInit();
        }, 
        err => {
          this.showToasterError();
        }
      )
      this.modalRef.hide();
    } else{
      this.edituser.name = this.editName;
      this.edituser.username = this.edituserName;
      this.edituser.email = this.editEmail;  
      this.userService.updateJSONUser(this.edituser).subscribe(
        () => {
          this.notifyService.showSuccess("User successfully updated :)")
          this.ngOnInit();
        }, 
        err => {
          this.showToasterError();
        }
      )
      this.modalRef.hide();
    }
    this.guarddeact.confirmStatus = false;
  }
  showSuccess(){
    this.notifyService.showSuccess("User successfully updated :)")
  }
  showToasterError(){
    this.notifyService.showError("Server not working. Please, try again later.")
  }
}
