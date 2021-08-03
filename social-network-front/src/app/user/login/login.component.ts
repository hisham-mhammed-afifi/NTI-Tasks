import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any = {
    email: '',
    password: '',
  };

  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit(): void {}

  login(form: any) {
    this.userData = form.value;
    this._user.login(this.userData).subscribe(
      (res) => {
        if (!localStorage.getItem('jwt')) {
          localStorage.setItem('jwt', res.token);
        }
        this._user.loginFlag = true;

        console.log('Login Flag: ', this._user.loginFlag);
      },
      (error) => console.log(error),
      () => this._router.navigateByUrl('')
    );
  }
}
