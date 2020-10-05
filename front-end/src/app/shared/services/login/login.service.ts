import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { Access } from '../../interfaces/access';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:Array<LoginUser> = [];
  url:string;
  urlAdmin:string;
  urlUser:string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/auth/signin';
    this.urlAdmin ='http://localhost:8080/api/test/admin';
    this.urlUser ='http://localhost:8080/api/test/user';
   }

   checkJSONUser(user:LoginUser):Observable<Array<LoginUser>>{
    return this.http.post<Array<LoginUser>>(this.url, user);
  }
  checkJSONBoardAdmin(key:string):Observable<any>{
    return this.http.get(this.urlAdmin, {headers: { "x-access-token": key}});
  }
  checkJSONBoardUser(key:string):Observable<any>{
    return this.http.get(this.urlUser, {headers: { "x-access-token": key}});
  }
}
