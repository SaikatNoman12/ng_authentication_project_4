import { Responce } from './../appInterface/authResponce/responce';
import { config } from './../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _errorSer: ErrorService
  ) { }

  onSignUp(email: string, pass: string,) {
    return this.http.post<Responce>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email: email,
      password: pass,
      returnSecureToken: true
    })
      .pipe(
        catchError(
          (err: any) => {
            return this._errorSer.handleError(err);
          }
        )
      );
  }


  onSignIn(email: any, pass: any) {
    return this.http.post<Responce>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(
          (err: any) => {
            return this._errorSer.handleError(err);
          }
        )
      );
  }

}
