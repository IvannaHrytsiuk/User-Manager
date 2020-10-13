import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDatailsComponent } from './user-datails/user-datails.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
const routes: Routes = [
  { path: '', component: UserDatailsComponent }
]

@NgModule({
  declarations: [UserDatailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserDatailsModule { }
