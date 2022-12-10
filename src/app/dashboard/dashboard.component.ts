import { AddEmployeeService } from './../appService/add-employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addEmployee: any;

  constructor(
    private _addEmployee: AddEmployeeService
  ) { }

  ngOnInit(): void {

    // use popup:-
    this._addEmployee.addEmployee.subscribe(
      (res: any) => {
        this.addEmployee = res;
      }
    );
  }


  // use for popup:-
  onShowEmployee() {
    this.addEmployee = !this.addEmployee;
  }

}
