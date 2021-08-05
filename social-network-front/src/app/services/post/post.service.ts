import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = 'http://localhost:3000/posts/';

  constructor(private _http: HttpClient) {}

  getPosts(): Observable<any> {
    return this._http.get(`${this.url}showall`);
  }
  addPost(data: any): Observable<any> {
    return this._http.post(`${this.url}add`, data);
  }
}
