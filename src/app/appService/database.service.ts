import { User } from './../appInterface/user';
import { config } from './../appConfig/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url: string = `${config.API_URL}users.json`;

  constructor(
    private http: HttpClient
  ) { }

  // post in database:-
  onPostData(userData: User) {
    return this.http.post<User>(this.url, userData);
  }


}
