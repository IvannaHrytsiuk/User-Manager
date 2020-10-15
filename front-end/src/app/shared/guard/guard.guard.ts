import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GuardsService } from '../../shared/services/guards.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private guardsService:GuardsService,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
    return this.checkLogin();
  }

  checkLogin(){
    if(this.guardsService.isLogin()){
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
