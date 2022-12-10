import { DatabaseService } from 'src/app/appService/database.service';
import { User } from './../appInterface/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEmployeeService } from '../appService/add-employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {

  myRecForm!: FormGroup;

  constructor(
    private _addEmployee: AddEmployeeService,
    private _database: DatabaseService
  ) { }

  ngOnInit(): void {

    this.myRecForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'designation': new FormControl(null, [Validators.required]),
      'department': new FormControl('developer', [Validators.required]),
      'status': new FormControl('active', [Validators.required]),
    });

  }

  // get form controls:-
  get fc() {
    return this.myRecForm.controls;
  }

  // popup:-
  onShowEmployee() {
    this._addEmployee.addEmployee.next(false);
  }

  // formSubmit:-
  onMyFormSubmit() {

    if ((this.fc?.['name']?.value === '' || this.fc?.['name']?.value === null) &&
      (this.fc?.['designation']?.value === '' || this.fc?.['designation']?.value === null)
    ) {
      alert('Please enter all input value');
    }
    else if (this.fc?.['name']?.value === '' || this.fc?.['name']?.value === null) {
      alert('Please enter your name!');
    }
    else if (this.fc?.['designation']?.value === '' || this.fc?.['designation']?.value === null) {
      alert('Please enter your designation!');
    }
    else {
      const UserData: User = this.myRecForm.value;
      this._database.onPostData(UserData).subscribe(
        (res) => { },
        (err) => { }
      )
      this.myRecForm.reset({
        'name': null,
        'designation': null,
        'department': 'developer',
        'status': 'active'
      });
      
      this.onShowEmployee();
    }
    // console.log(this.fc?.['name'].valid);
  }

}
