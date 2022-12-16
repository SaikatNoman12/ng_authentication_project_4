import { AuthService } from 'src/app/appService/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpineService {

  spine: any = new BehaviorSubject(false);

  myRecFormData: any = new Subject();

  profileInfo: any;

  constructor(
    private _authService: AuthService
  ) { }

  editModeFuncService(myRecForm: any) {
    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.profileInfo = res;

        myRecForm.setValue({
          name: this.profileInfo?.displayName ? this.profileInfo?.displayName : '',
          profileImageUrl: this.profileInfo?.photoUrl ? this.profileInfo?.photoUrl : ''
        });
      }
    );
  }

}
