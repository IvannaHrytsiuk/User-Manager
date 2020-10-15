import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserDatailsComponent } from '../../user-datails/user-datails/user-datails.component';


@Injectable({
  providedIn: 'root'
})
export class DeactGuard implements CanDeactivate<UserDatailsComponent> {
  canDeactivate(
    component:UserDatailsComponent,
    currentRoute:ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?:RouterStateSnapshot){
      return confirm('Are you sure?')
    }
}
