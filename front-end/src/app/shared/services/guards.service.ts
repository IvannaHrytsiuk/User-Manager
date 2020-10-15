import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor() { }

  isLogin(){
    if(localStorage.getItem('user') || localStorage.getItem('admin')){
      return true;
    } else{
      return false;
    }
  }
}
