import { AddEmployeeService } from './../../appService/add-employee.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from 'src/app/appService/database.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AddEmployeeService,
    DatabaseService
  ]
})
export class SharedModule { }
