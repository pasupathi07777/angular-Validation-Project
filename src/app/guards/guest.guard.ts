import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/auth/user.service';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.isLoginStatusObservable.pipe(
      take(1),  
      map(isLoggedIn => {
        if (isLoggedIn === null) {
          return this.router.createUrlTree(['/loading']);  
        }
        if (isLoggedIn) {
          return this.router.createUrlTree(['']);
        } else {
          return true;
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
