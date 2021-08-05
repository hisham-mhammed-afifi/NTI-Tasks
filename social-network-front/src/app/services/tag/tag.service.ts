import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private url: string = 'http://localhost:3000/tags/';

  constructor(private _http: HttpClient) {}

  getTags(): Observable<any> {
    return this._http.get(`${this.url}showall`);
  }
}
