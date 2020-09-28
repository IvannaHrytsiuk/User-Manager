import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDatailsComponent } from './user-datails/user-datails.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserDatailsComponent }
]

@NgModule({
  declarations: [UserDatailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ]
})
export class UserDatailsModule { }
