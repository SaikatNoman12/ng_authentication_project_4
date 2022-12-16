import { SpineService } from './../appService/spine.service';
import { AuthService } from 'src/app/appService/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  profileInfo: any;

  spinner: boolean = false;

  myRecForm: any;

  constructor(
    private _authService: AuthService,
    private _spineService: SpineService
  ) {

    this._spineService.spine.subscribe(
      (res: any) => {
        this.spinner = res;
      }
    );

    _spineService.myRecFormData.subscribe(
      (resFormData: any) => {
        this.myRecForm = resFormData;
      }
    );

  }

  ngOnInit(): void {
    this._authService.user.subscribe(
      (res: any) => {
        // first system. use if else condition:-
        /* 
        if(res){
          this.isLoggedIn = false;
        }
        else{
          this.isLoggedIn = true;
        } */

        // second system. use ternary operator:-
        /* this.isLoggedIn = !res ? false : true;*/

        // second system. use not operator:-
        this.isLoggedIn = !!res;

      }
    );

    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.profileInfo = res;
        this._spineService.spine.next(false);
      }
    );
  }

  editModeFunc() {
    this._spineService.editModeFuncService(this.myRecForm);
  }

  // sign out:--
  onSignOutData() {
    this._authService.signOut();
  }

}
