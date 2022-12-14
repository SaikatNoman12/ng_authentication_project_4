import { AuthService } from './../appService/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, pipe, take, exhaustMap } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._authService.user.pipe(
      take(1),
      exhaustMap(
        (user: any) => {

          if (!user) {
            return next.handle(request);
          }
          else {
            const modifiedReq = request.clone(
              {
                params: new HttpParams().set("auth", user.token)
              }
            );

            return next.handle(modifiedReq);

          }

        }
      )
    )
  }
}
