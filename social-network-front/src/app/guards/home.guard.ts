import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private _router: Router, private _user: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('jwt') || this._user.loginFlag) {
      console.log('You are loged in ...', this._user.loginFlag);

      this._router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
