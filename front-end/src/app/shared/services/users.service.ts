import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPost } from '../interfaces/userShort.interface';
import { UserP } from '../models/userShort.interface';
import { map } from 'rxjs/operators';
import { UserEd } from '../interfaces/user.ed.';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:Array<Users> = [];
  url:string;
  addUrl:string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/users';
    this.addUrl = 'http://localhost:8080/api/auth/signup'
  }
   
  getUsers():Array<Users>{
    return this.users;
  }
  getJSONUsers():Observable<Array<Users>>{
    return this.http.get<Array<Users>>(this.url);
  }
  addJSONUser(user:UserP):Observable<Array<UserP>>{
    return this.http.post<Array<UserP>>(this.addUrl, user)
  }
  deleteJSONUser(id: number):Observable<Array<Users>>{
    return this.http.delete<Array<Users>>(`${this.url}/${id}`);
  }
  updateJSONUser(user: UserEd):Observable<Array<UserEd>>{
    return this.http.post<Array<UserEd>>(this.url, user);
  }
  get1User(id: number):Observable<Array<Users>>{
    return this.http.get<Array<Users>>(`${this.url}/${id}`);
  }
}
