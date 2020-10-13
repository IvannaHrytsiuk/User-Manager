import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
admin;
user;
welcome = '';
  constructor() { }

  ngOnInit(): void {
    this.welcome = '';
    if(localStorage.getItem("admin")){
      this.admin = localStorage.getItem("admin");
      this.admin = JSON.parse(this.admin);
      this.welcome = this.admin.user.name
    }
    if(localStorage.getItem("user")){
      this.user = localStorage.getItem("user");
      this.user = JSON.parse(this.user);
      this.welcome = this.user.user.name
    }
  }
  deleteStorage(){
    localStorage.clear();
  }
}
