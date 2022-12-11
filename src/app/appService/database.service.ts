import { User } from './../appInterface/user';
import { config } from './../appConfig/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url: string = `${config.API_URL}users.json`;

  constructor(
    private http: HttpClient,
  ) { }

  // post data in database:-
  onPostData(userData: User) {
    return this.http.post<User>(this.url, userData);
  }

  // get data in database:-
  onFetchData() {
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
    // const userUrl = `${config.API_URL}${userId}.json`;
    // this.http.delete(userUrl);
  }

}
