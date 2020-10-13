import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent }
]
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild( routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
