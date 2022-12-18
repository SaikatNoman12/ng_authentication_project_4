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
  user: any = new BehaviorSubject<any>(null);
  profileInfo: any = new BehaviorSubject({
    displayName: '',
    email: '',
    photoUrl: ''
  });

  constructor(
    private http: HttpClient,
    private _errorSer: ErrorService,
    private router: Router
  ) { }

  // use for sign up:--
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

  // use for sign in:--
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

  // use for auto sign in
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
      const locationPath = routePath === '' || routePath === 'forget-password' ? 'dashboard' : routePath;
      this.router.navigate([locationPath]);

      // auto sign out:-
      const exTimeDeu = new Date(parseData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(exTimeDeu);

      this.getProfileData(loggedUser.token);
    }
  }

  // use for sign out:--
  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

    if (this.exTime) {
      clearTimeout(this.exTime);
    }
    this.exTime = null;
  }

  // use for auto sign out:--
  autoSignOut(exTime: number) {

    this.exTime = setTimeout(() => {

      this.signOut();

    }, exTime);

  }

  // set data in localStorage:-- 
  private authenticatedUser(email: string, userId: string, token: string, expireIn: any) {

    const expirationDate = new Date(new Date().getTime() + expireIn * 5000);

    const user = new User(email, userId, token, expirationDate);

    // send subject data:-
    this.user.next(user);

    // autoSignOut:-
    this.autoSignOut(expireIn * 1000);

    // set signup data in localStorage:-
    localStorage.setItem('userData', JSON.stringify(user));

    this.getProfileData(token);

  }

  // user profile update:-
  updateProfile(userData: any) {

    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
      {
        idToken: userData.idToken,
        displayName: userData.name,
        photoUrl: userData.profileImageUrl,
        returnSecureToken: true
      }).pipe(
        catchError(
          (err: any) => {
            return this._errorSer.handleError(err);
          }
        )
      );

  }

  // get profile data:-
  getProfileData(token: string) {

    this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.API_KEY}`, {
      idToken: token
    })
      .pipe(
        catchError(
          (err: any) => {
            return this._errorSer.handleError(err);
          }
        )
      )
      .subscribe(
        (res: any) => {
          this.profileInfo.next({
            displayName: res?.users[0]?.displayName,
            email: res?.users[0]?.email,
            photoUrl: res?.users[0]?.photoUrl
          });
        }
      );

  }

  // use for change password:-
  changePassword(data: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`, {
      idToken: data.idToken,
      password: data.password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(
        (err: any) => {
          return this._errorSer.handleError(err);
        }
      )
    );
  }

  // use for forget password:-
  forgetPassword(data: any) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`,
      {
        requestType: "PASSWORD_RESET",
        email: data.email
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

  // use for google login:-
  // googleLogin(idToken: any) {
  //   return this.http.post<any>(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.API_KEY}`,
  //     {
  //       postBody: `id_token=${idToken}&providerId=google.com`,
  //       requestUri: "http://localhost/4200",
  //       returnIdpCredential: true,
  //       returnSecureToken: true
  //     }
  //   )
  //     .pipe(
  //       catchError(
  //         (err: any) => {
  //           return this._errorSer.handleError(err);
  //         }
  //       ),
  //       tap(
  //         res => {
  //           this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
  //         }
  //       )
  //     );
  // }

}
