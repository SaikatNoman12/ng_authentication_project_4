import { AddEmployeeService } from './../../appService/add-employee.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AddEmployeeService
  ]
})
export class SharedModule { }
