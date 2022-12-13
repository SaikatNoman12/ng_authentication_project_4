import { ErrorService } from './../appService/error.service';
import { Responce } from './../appInterface/authResponce/responce';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appService/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modeSwitch: boolean = true;
  error: any;

  myRecForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _errorService: ErrorService,
    private router: Router
  ) { }

  errorMsg: any = this._errorService.errorMessage;

  ngOnInit(): void {

    this.myRecForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  onModeSwitch() {
    this.modeSwitch = !this.modeSwitch;
  }

  // get
  get recForm() {
    return this.myRecForm.controls;
  }

  // form submit:-
  onFormSubmit() {
    if (this.myRecForm.valid) {
      const email = this.myRecForm.value.email;
      const password = this.myRecForm.value.password;

      let authObservable: Observable<Responce>;

      if (this.modeSwitch) {
        // sign in:--
        authObservable = this._authService.onSignIn(email, password)
      }
      else {
        // sign up:--
        authObservable = this._authService.onSignUp(email, password)
      }

      // observable:--
      authObservable.subscribe(
        (res: any) => {
          // console.log(res);
          this.router.navigate(['dashboard']);
        },
        (err: any) => {

          setTimeout(() => {
            // this.error = this.errorMsg[err];
            this.error = err;
          }, 0);
          setTimeout(() => {
            this.error = '';
          }, 6000);
          
          /* // error message:- 
          if (!err.error || !err.error.error) {
            this.error = this.errorMsg['UNKNOWN'];
          } 
          else {
            this.error = this.errorMsg[err.error.error.message];
          } */

        }
      );

    }
    else {
    }
  }

}
