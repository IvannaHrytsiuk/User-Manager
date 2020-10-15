import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/shared/interfaces/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  viewUser:Users;
  arrEnt;
  id;
  constructor(private userService: UsersService, 
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    let us:any = localStorage.getItem('user');
    let adm:any = localStorage.getItem('admin');
    if(us != null){
      us = JSON.parse(us);
     this.id = us.user.roles[0].user_roles.userId;
    } else if(adm != null){
      adm = JSON.parse(adm);
     this.id = adm.user.roles[0].user_roles.userId;
    }

      this.userService.get1User(this.id).subscribe(
        data =>{
          this.viewUser = data[0];
          this.arrEnt = this.viewUser.entitlements;
          this.arrEnt = this.arrEnt.replace('[', '').replace(']','').split(',')
        }
      )
  }
  deleteStorage(){
    localStorage.clear();
  }
}
