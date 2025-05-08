import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private userService: UserService, private route: Router) {}

  logout(): void {
    localStorage.removeItem('jwt');
    this.userService.updateCurrentUser(null);
    this.userService.isLoginStatusSubject.next(false);
    this.route.navigate(['/login']);
  }
}
