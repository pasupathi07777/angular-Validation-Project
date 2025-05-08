import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userData } from 'src/app/interfaces/auth-response';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoginStatusSubject = new BehaviorSubject<boolean  | null>(null);
  isLoginStatusObservable = this.isLoginStatusSubject.asObservable();

  userSubject = new BehaviorSubject<userData | null>(null);
  currentUserObservable = this.userSubject.asObservable();

  constructor(
  ) {}

  getCurrentUser(): userData | null {
    return this.userSubject.getValue();
  }

  updateCurrentUser(user: userData | null): void {
    this.userSubject.next(user);
    console.log(this.getCurrentUser());
  }

  updateStatusLogin(status:boolean){
    this.isLoginStatusSubject.next(status)

  }


}
