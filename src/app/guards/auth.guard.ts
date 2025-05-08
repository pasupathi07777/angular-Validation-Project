import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../services/auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.isLoginStatusObservable.pipe(
      map((isLoggedIn) => {
        console.log(isLoggedIn," auth out ");
        if (isLoggedIn === null) {
          console.log(isLoggedIn," auth");
          return this.router.createUrlTree(['/loading']);
        }

        if (isLoggedIn) {
          return true;
        } else {
          console.log('User not logged in, redirecting to login');
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
