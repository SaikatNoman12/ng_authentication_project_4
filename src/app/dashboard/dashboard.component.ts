import { AuthService } from 'src/app/appService/auth.service';
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

  spinnerShow: boolean = false;

  userInfoData: any;

  constructor(
    private _addEmployee: AddEmployeeService,
    private _database: DatabaseService,
    private _authService: AuthService
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

    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.userInfoData = res;
      }
    )

  }

  // use for popup:-
  onShowEmployee() {
    this.addEmployee = !this.addEmployee;
  }

  // delete database data:-
  onDeleteEmployee(userId: string) {
    this._database.onDeleteData(userId).subscribe(
      (res) => {
        this.onFetchDatabaseData();
      },
      (err) => { }
    )
  }

  // fetch database data:
  onFetchDatabaseData() {
    this.spinnerShow = true;
    this._database.onFetchData().subscribe(
      (response: any) => {
        this.dbDataArray = response;
        this.spinnerShow = false;
      }
    );

  }

}
