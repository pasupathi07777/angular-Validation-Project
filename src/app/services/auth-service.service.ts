import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse, userData } from '../interfaces/auth-response';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
    userLogin:boolean=false
    userSubject=new BehaviorSubject<userData | null>(null)
    currentUserObservable=this.userSubject.asObservable()
  
  
    getCurrentUser():userData | null{
      return this.userSubject.getValue()
    }
  
    updateCurrentUser(user:userData | null):void{
     this.userSubject.next(user)
     this.userLogin=true
     console.log(this.getCurrentUser());

    }
  
    setTokenInLocalStorage(token:string): void {
      localStorage.setItem('jwt',token)
    }
    getTokenInLocalStorage(): string | null {
      return localStorage.getItem('jwt')
    }

    logout(route:Router): void {
      localStorage.removeItem('jwt');
      this.userSubject.next(null);
      this.userLogin=false
      route.navigate(['/login'])
    }

}
