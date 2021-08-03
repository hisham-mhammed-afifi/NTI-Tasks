import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private _user: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    if (token) {
      this._user.loginFlag = true;
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
    }
    console.log(request);

    return next.handle(request);
  }
}
