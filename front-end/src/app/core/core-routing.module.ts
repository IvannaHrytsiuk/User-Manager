import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactGuard } from '../shared/guard/deact.guard';
import { GuardGuard } from '../shared/guard/guard.guard';

import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', loadChildren: () => import('../login/login.module').then(m=> m.LoginModule)},
  {path: 'my-page', loadChildren: () => import('../account/account.module').then(m=> m.AccountModule), canActivate:[GuardGuard]},
  {path: 'users', loadChildren: () => import('../users/users.module').then(m=> m.UsersModule), canActivate:[GuardGuard]},
  {path: 'user/:id', loadChildren: () => import('../user-datails/user-datails.module').then(m=> m.UserDatailsModule), canActivate:[GuardGuard], canDeactivate:[DeactGuard]},
  {path: 'dashboard', component: MainPageComponent, canActivate:[GuardGuard]}
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
