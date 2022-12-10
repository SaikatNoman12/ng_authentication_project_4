import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddemployeeRoutingModule } from './addemployee-routing.module';
import { AddemployeeComponent } from './addemployee.component';


@NgModule({
  declarations: [
    AddemployeeComponent
  ],
  imports: [
    CommonModule,
    AddemployeeRoutingModule
  ],
  exports:[
    AddemployeeComponent
  ]
})
export class AddemployeeModule { }
