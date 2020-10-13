import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/shared/interfaces/login.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import {NgForm} from '@angular/forms';
import { HtmlTagDefinition } from '@angular/compiler';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  access;
  admin;
  userObj;
  user:LoginUser = {
    email:'',
    password:''
  }
  loginForm:NgForm;


  constructor(private loginService: LoginService,
    public router: Router,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  check(){
      this.loginService.checkJSONUser(this.user).subscribe(
        data => {
          this.access = data;
          this.loginService.checkJSONBoardAdmin(this.access.accessToken).subscribe(
            data => {
              console.log(data);
              this.admin  = data;
              if(data.user.roles[0].name === 'USER'){
                this.loginService.checkJSONBoardUser(this.access.accessToken).subscribe(
                  data => {
                    console.log(data);
                    this.userObj = data;
                    if(data.user.roles[0].name === 'ADMIN'){
                      return;
                    } else{
                      this.router.navigate(['/dashboard']);
                      localStorage.setItem('user', JSON.stringify(this.userObj));
                    }
                  }, err => {
                    console.log(err)
                  }
                )
              } else{
                this.router.navigate(['/dashboard']);
                localStorage.setItem('admin', JSON.stringify(this.admin))
              }
            }, err => {
              console.log(err)
            }
          )
        },
        err => {
          console.log(err);
          if(err.status === 404){
            this.showToasterError404();
          }
          if(err.status === 401){
            this.showToasterError401()
          }
        }
      )
  }
  showToasterError404(){
    this.notifyService.showError("You are not registered")
  }
  showToasterError401(){
    this.notifyService.showError("Email or password incorrect")
  }
}
