import { AuthService } from 'src/app/appService/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.scss']
})
export class ChnagePasswordComponent implements OnInit {

  myRecForm !: FormGroup;

  token: string = JSON.parse(localStorage.getItem('userData') as any)._token;

  changePass: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {

    this.myRecForm = this.fb.group({
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  get formPass() {
    return this.myRecForm.controls['password'];
  }

  myRecFormSubmit() {
    if (this.myRecForm.valid) {
      const data = {
        idToken: this.token,
        ...this.myRecForm.value
      };

      this._authService.changePassword(data).subscribe(
        (res) => {
          // console.log(res);
          this.changePass = false;
        },
        (err) => { }
      );

    } else {
      alert('Please fill your password!');
    }
  }






}
