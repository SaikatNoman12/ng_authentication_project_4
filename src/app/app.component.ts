import { AuthService } from 'src/app/appService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularAuthProject';

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.autoSignIn();
  }

}
