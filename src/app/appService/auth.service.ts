import { Responce } from './../appInterface/authResponce/responce';
import { config } from './../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { BehaviorSubject, catchError, pipe, Subject, tap } from 'rxjs';
import { User } from '../appModal/user.modal';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private exTime: any;

  constructor(
    private http: HttpClient,
    private _errorSer: ErrorService,
    private router: Router
  ) { }

  user: any = new BehaviorSubject<any>(null);

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

  autoSignIn() {

    // const myData = JSON.parse(localStorage.getItem('userData') as any);

    let userData = localStorage.getItem('userData');
    let parseData = JSON.parse(userData as any);

    if (!parseData) {
      return;
    }

    const loggedUser = new User(parseData.email, parseData.id, parseData._token, new Date(parseData._tokenExpirationDate));

    if (loggedUser.token) {
      this.user.next(loggedUser);

      // control path setting another login:-
      const routePath = location.pathname.substr(1);
      const locationPath = routePath === '' ? 'dashboard' : routePath;
      this.router.navigate([locationPath]);

      // auto sign out:-
      const exTimeDeu = new Date(parseData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(exTimeDeu);

    }
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

    if (this.exTime) {
      clearTimeout(this.exTime);
    }
    this.exTime = null;
  }

  autoSignOut(exTime: number) {

    this.exTime = setTimeout(() => {

      this.signOut();

    }, exTime);

  }

  private authenticatedUser(email: string, userId: string, token: string, expireIn: any) {

    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);

    const user = new User(email, userId, token, expirationDate);

    // send subject data:-
    this.user.next(user);

    // autoSignOut:-
    this.autoSignOut(expireIn * 1000);

    // set signup data in localStorage:-
    localStorage.setItem('userData', JSON.stringify(user));

  }

}
