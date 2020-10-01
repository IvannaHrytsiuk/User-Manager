import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPageComponent } from './my-page/my-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MyPageComponent }
]

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ]
})
export class AccountModule { }
