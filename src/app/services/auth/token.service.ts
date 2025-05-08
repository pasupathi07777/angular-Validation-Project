import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { LoginResponse } from 'src/app/interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    isLoadingSubject = new BehaviorSubject<boolean >(false);
    isLoadingObservable = this.isLoadingSubject.asObservable();

  constructor(
  
        private http: HttpClient,
        private route: Router,
        private userService:UserService
  ) { }

  setTokenInLocalStorage(token: string): void {
    localStorage.setItem('jwt', token);
  }
  
  getTokenInLocalStorage(): string | null {
    return localStorage.getItem('jwt');
  }

    verifyToken(token: string): void {
      this.isLoadingSubject.next(true);
      this.http
        .get<LoginResponse>(
          `${environment.baseUrl}auth/verify-token?token=${token}`
        )
        .pipe(
          tap((res)=>{
            const { user } = res;
            this.userService.updateCurrentUser(user);
            this.userService.updateStatusLogin(true);
          }),
          catchError((err)=>{
            this.userService.updateCurrentUser(null);
            this.userService.updateStatusLogin(false);
            return of(null)
          }),
          finalize(()=>{
            this.isLoadingSubject.next(false);
          })
        ).subscribe()
    }

    verifyOurState(){
      const token: string | null = this.getTokenInLocalStorage();
      console.log(token);
      if (token) {
        this.verifyToken(token);
        
      } else {
        this.userService.updateStatusLogin(false);
      }
    }
}
