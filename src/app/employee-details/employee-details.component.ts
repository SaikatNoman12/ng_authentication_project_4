import { DatabaseService } from './../appService/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../appInterface/user';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(
    private _activeRoute: ActivatedRoute,
    private _database: DatabaseService
  ) { }

  getRoute: any;
  getRouteId: any;
  getUserData: User | any;

  ngOnInit(): void {
    this.getRoute = this._activeRoute.params.subscribe(
      (params: Params) => {
        this.getRouteId = params['employeeId'].substring(2);
        this.onFetchSingleData();
      }
    );

  }

  onFetchSingleData() {
    this._database.onFetchSingleData(this.getRouteId).subscribe(
      (response: any) => {
        this.getUserData = response;
      },
      (err: any) => { }
    );
  }

}
