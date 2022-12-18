import { AuthService } from 'src/app/appService/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  myRecForm !: FormGroup;

  error: any = null;

  showSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.myRecForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]]
    });
  }

  get formEmail() {
    return this.myRecForm.controls['email'];
  }

  myRecFormSubmit() {
    if (this.myRecForm.valid) {
      this._authService.forgetPassword(this.myRecForm.value).subscribe(
        (res: any) => {
          this.showSuccess = true;
          this.error = null;
        },
        (err: any) => {
          this.error = err;
        }
      );
    }
    else {
      let key = Object.keys(this.myRecForm.controls);

      key.filter(
        data => {
          let control = this.myRecForm.controls[data];

          if (control !== null) {
            control.markAsTouched();
          }
        }
      );
    }
  }

}
