import { Responce } from './../appInterface/authResponce/responce';
import { config } from './../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, pipe, Subject, tap } from 'rxjs';
import { User } from '../appModal/user.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _errorSer: ErrorService
  ) { }

  user: any = new Subject<User>();

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
        ),
        tap(
          res => {
            this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
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
        ),
        tap(
          res => {
            this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
          }
        )
      );
  }


  private authenticatedUser(email: string, userId: string, token: string, expireIn: any) {

    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);

    const user = new User(email, userId, token, expirationDate);
    console.log( 'User => ', user);

    // send subject data:-
    this.user.next(user);

  }

}
