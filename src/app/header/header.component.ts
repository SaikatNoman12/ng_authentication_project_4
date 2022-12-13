import { AuthService } from 'src/app/appService/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;

  constructor(
    private _authService: AuthService
  ) { }

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
    )

  }

  ngOnDestroy() {

  }

}
