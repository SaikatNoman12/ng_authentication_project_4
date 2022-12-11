import { DatabaseService } from 'src/app/appService/database.service';
import { AddEmployeeService } from './../appService/add-employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addEmployee: any;
  dbDataArray: any;

  constructor(
    private _addEmployee: AddEmployeeService,
    private _database: DatabaseService,
  ) { }

  ngOnInit(): void {

    // use popup:-
    this._addEmployee.addEmployee.subscribe(
      (res: any) => {
        this.addEmployee = res;
      }
    );

    // fetch database data:-
    this.onFetchDatabaseData();
  }

  // use for popup:-
  onShowEmployee() {
    this.addEmployee = !this.addEmployee;
  }

  // delete database data:-
  onDeleteEmployee(userId: string) {
    console.log(userId);
    this._database.onDeleteData(userId).subscribe(
      (res) => {
        this.onFetchDatabaseData();
      },
      (err) => { }
    )
  }

  // fetch database data:
  onFetchDatabaseData() {
    this._database.onFetchData().subscribe(
      (response: any) => {
        this.dbDataArray = response;
      }
    );

  }

  onViewEmployee(userId: string) {
    console.log(userId);
  }


}
