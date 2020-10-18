import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserDatailsComponent } from '../../user-datails/user-datails/user-datails.component';


@Injectable({
  providedIn: 'root'
})
export class DeactGuard implements CanDeactivate<UserDatailsComponent> {
  confirmStatus:boolean = false;
  canDeactivate(
    component:UserDatailsComponent,
    currentRoute:ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?:RouterStateSnapshot){
      if(this.confirmStatus === true){
        this.confirmStatus = false;
        return confirm('Are you sure?')
      }
      return true;
    }
}
