import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UsersComponent } from './components/users/users.component';
import { AccountComponent } from './components/account/account.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: MainPageComponent },
  {path: 'users', component: UsersComponent},
  {path: 'user/:id', component: UserDetailsComponent },
  {path: 'my-page', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
