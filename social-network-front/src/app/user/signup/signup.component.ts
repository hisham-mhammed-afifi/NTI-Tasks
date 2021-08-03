import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userData: any = {
    name: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    country: '',
  };
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit(): void {}

  signup(form: any) {
    this.userData = form.value;
    this._user.signup(this.userData).subscribe((res) => console.log(res));
    this._router.navigateByUrl('/login');
  }
}
