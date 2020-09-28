import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/interfaces/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:Array<Users> = [];
  constructor( private usersServices: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void{
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
}
