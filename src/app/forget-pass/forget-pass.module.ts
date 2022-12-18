import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPassRoutingModule } from './forget-pass-routing.module';
import { ForgetPassComponent } from './forget-pass.component';


@NgModule({
  declarations: [
    ForgetPassComponent
  ],
  imports: [
    CommonModule,
    ForgetPassRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForgetPassModule { }
