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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.myRecForm = this.fb.group({
      'name': [null, [Validators.required]],
      'profile-img': [null, [Validators.required]]
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
    const profileData: Profile = this.myRecForm.value;
    console.log(profileData);
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } });
    this.myRecForm.reset();
  }


}
