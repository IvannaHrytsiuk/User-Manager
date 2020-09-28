import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ MainPageComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ]
})
export class CoreModule { }
