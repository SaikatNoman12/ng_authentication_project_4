import { Component, OnInit } from '@angular/core';
import { AddEmployeeService } from '../appService/add-employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {

  constructor(
    private _addEmployee:AddEmployeeService,
  ) { }

  ngOnInit(): void {
  }


  // popup:-
  onShowEmployee(){
    this._addEmployee.addEmployee.next(false);
  }

}
