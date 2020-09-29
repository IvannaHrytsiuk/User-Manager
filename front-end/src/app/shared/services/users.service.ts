import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPost } from '../interfaces/userShort.interface';
import { UserP } from '../models/userShort.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:Array<Users> = [];
  url:string;
  

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/users';
  }
   
  getUsers():Array<Users>{
    return this.users;
  }
  getJSONUsers():Observable<Array<Users>>{
    return this.http.get<Array<Users>>(this.url);
  }
  addJSONUser(user:UserPost):Observable<Array<UserPost>>{
    return this.http.post<Array<UserPost>>(this.url, user);
  }
  deleteJSONUser(id: number):Observable<Array<Users>>{
    return this.http.delete<Array<Users>>(`${this.url}/${id}`);
  }
  getJSONOneUser(id:number):Observable<Users>{
    return this.http.get<Users>(`${this.url}/${id}`)
  }
}
