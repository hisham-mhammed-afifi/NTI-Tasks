import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _user: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem('jwt') && !this._user.loginFlag) {
      console.log('You shoud Login ...', this._user.loginFlag);

      this._router.navigate(['user/login'], {
        queryParams: { toUrl: route.url },
      });
      // return false;

      const urlTree = this._router.createUrlTree(['user/login']);
      return urlTree;
    }

    return true;
  }
}
