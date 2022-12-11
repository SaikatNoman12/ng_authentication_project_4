import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddemployeeRoutingModule } from './addemployee-routing.module';
import { AddemployeeComponent } from './addemployee.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddemployeeComponent
  ],
  imports: [
    CommonModule,
    AddemployeeRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AddemployeeComponent
  ]
})
export class AddemployeeModule { }
