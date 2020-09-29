import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';


const routes: Routes = [
  { path: '', component: UsersComponent }
]
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
