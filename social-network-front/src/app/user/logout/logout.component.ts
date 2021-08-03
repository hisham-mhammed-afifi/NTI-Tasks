import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit(): void {}

  logout() {
    this._user.logout().subscribe(
      (res) => {
        localStorage.removeItem('jwt');
        this._user.loginFlag = false;

        console.log('response', res);
      },
      (error) => console.log('error', error),
      () => this._router.navigateByUrl('user/login')
    );
  }
}
