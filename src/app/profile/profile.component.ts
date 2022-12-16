import { SpineService } from './../appService/spine.service';
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

  // get profile data:-
  profileInfo: any;

  spinnerShow: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _spineService: SpineService
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


    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.profileInfo = res;

        this.myRecForm.setValue({
          name: this.profileInfo?.displayName ? this.profileInfo?.displayName : '',
          profileImageUrl: this.profileInfo?.photoUrl ? this.profileInfo?.photoUrl : ''
        });
      }
    );

    // send my rec form:-
    this._spineService.myRecFormData.next(this.myRecForm);

  }

  get fControl() {
    return this.myRecForm.controls;
  }

  onRecFormSubmit() {
    if (this.myRecForm.valid) {
      this.spinnerShow = true;

      const profileData: Profile = {
        idToken: this.userToken,
        ...this.myRecForm.value
      };

      this._spineService.spine.next(true);
      // set profile data:-
      this._authService.updateProfile(profileData).subscribe(
        (res: any) => {
          this._authService.getProfileData(this.userToken);
          this._spineService.spine.next(false);
          this.spinnerShow = false;
        },
        (err: any) => console.log(err)
      );

      this.router.navigate([], { queryParams: { EditMode: null } });

    }
    else {
      alert('please fill all data!');
    }
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } });
  }


  editModeFunc() {
    this._spineService.editModeFuncService(this.myRecForm);
  }

  // reset form:-
  restRecForm() {
    if (confirm('Click ok then reset your form! \n -----OR----- \n Click cancel. Then do not reset your form!')) {
      this.myRecForm.reset();
    }
  }


}
