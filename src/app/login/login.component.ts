import { Responce } from './../appInterface/authResponce/responce';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appService/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modeSwitch: boolean = true;

  myRecForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

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
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );

    }
    else {
    }
  }

}
