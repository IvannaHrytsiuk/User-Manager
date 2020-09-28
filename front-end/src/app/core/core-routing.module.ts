import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', loadChildren: () => import('../login/login.module').then(m=> m.LoginModule)},
  {path: 'my-page', loadChildren: () => import('../account/account.module').then(m=> m.AccountModule)},
  {path: 'dashboard', component: MainPageComponent}
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
