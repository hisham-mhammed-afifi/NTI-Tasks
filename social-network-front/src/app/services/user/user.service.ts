import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loginFlag: Boolean = false;
  private url: string = 'http://localhost:3000/users/';
  constructor(private _http: HttpClient) {}

  signup(userData: any): Observable<any> {
    return this._http.post(`${this.url}signup`, userData);
  }
  login(userData: any): Observable<any> {
    return this._http.post(`${this.url}login`, userData);
  }
  logout(): Observable<any> {
    return this._http.post(`${this.url}logout`, {});
  }
}
