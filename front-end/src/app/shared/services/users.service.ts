import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:Array<Users> = [];
  url:string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/users';
  }
   
  getCity():Array<Users>{
    return this.users;
  }
  getJSONUsers():Observable<Array<Users>>{
    return this.http.get<Array<Users>>(this.url);
  }
}
