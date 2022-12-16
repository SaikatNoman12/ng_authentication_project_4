import { AuthService } from 'src/app/appService/auth.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Profile } from './../appInterface/profile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // reactive form:-
  myRecForm !: FormGroup;

  // edit mode:- 
  editMode: boolean = false;

  // get user token:-
  userToken: string = JSON.parse(localStorage.getItem('userData') as any)._token;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.myRecForm = this.fb.group({
      'name': [null, [Validators.required]],
      'profileImageUrl': [null, [Validators.required]]
    });

    // query params activate route:-
    this.activatedRoute.queryParamMap.subscribe(
      (res: any) => {
        let qParam = res.get('EditMode');
        if (qParam !== null) {
          this.editMode = true;
        }
        else {
          this.editMode = false;
        }
      }
    );

  }

  get fControl() {
    return this.myRecForm.controls;
  }

  onRecFormSubmit() {
    if (this.myRecForm.valid) {

      const profileData: Profile = {
        idToken: this.userToken,
        ...this.myRecForm.value
      };

      // set profile data:-
      this._authService.updateProfile(profileData).subscribe(
        (res: any) => console.log(res),
        (err: any) => console.log(err)
      )

    }
    else {
      alert('please fill all data!');
    }
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } });
    this.myRecForm.reset();
  }


}
