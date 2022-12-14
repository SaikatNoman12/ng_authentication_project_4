import { User } from './../appInterface/user';
import { config } from './../appConfig/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, pipe, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url: string = `${config.API_URL}users.json`;

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) { }

  // post data in database:-
  onPostData(userData: User) {
    return this.http.post<User>(this.url, userData);
  }

  // get data in database:-
  onFetchData() {

    // use token analog system:-
    /* return this._authService.user.pipe(
      take(1),
      exhaustMap(
        (user: any) => {
          return this.http.get<User>(this.url, {
            params: new HttpParams().set('auth', user.token)
          });
        }
      ),
      map(
        (responseData: any) => {
          const data = [];
          for (const key in responseData) {
            data.push({
              userId: key,
              ...responseData[key]
            });
          }
          return data;
        }
      )
    ); */

    // use token in interceptor:-
    return this.http.get(this.url)
      .pipe(map(
        (responseData: any) => {
          const dataArr = [];
          for (const key in responseData) {
            dataArr.push({
              userId: key,
              ...responseData[key]
            });
          }
          return dataArr;
        }
      ));
  }

  // delete data in database:-
  onDeleteData(userId: string) {
    const userUrl = `${config.USER_URL}${userId}.json`;
    return this.http.delete(userUrl);
  }

  onFetchSingleData(userId: string) {
    const userUrl = `${config.USER_URL}${userId}.json`;

    // use token in analog system:-
    /*  return this._authService.user.pipe(
       exhaustMap(
         (user: any) => {
           return this.http.get<User>(userUrl, {
             params: new HttpParams().set('auth', user.token)
           });
         }
       )
     ) */

    // use token in interceptor:-
    return this.http.get(userUrl);

  }

}
