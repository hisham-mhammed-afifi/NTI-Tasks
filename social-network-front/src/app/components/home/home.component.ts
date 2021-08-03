import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit(): void {
    if (this._user.loginFlag) {
      console.log('login flag from home: ', this._user.loginFlag);
    } else {
      console.log('login flag from home: ', this._user.loginFlag);
    }
  }
}
