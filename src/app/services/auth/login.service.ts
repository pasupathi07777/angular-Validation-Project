import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { LoginResponse } from 'src/app/interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingObservable = this.isLoadingSubject.asObservable();

  constructor(
    private toast: ToastrService,
    private http: HttpClient,
    private route: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  logIn(form: any) {
    this.isLoadingSubject.next(true);
    console.log(form);

    this.http
      .post<LoginResponse>(`${environment.baseUrl}auth/login`, form)
      .pipe(
        tap((res) => {
          this.toast.success('Login successful!', 'Success');
          const { token, user } = res;
          this.userService.updateCurrentUser(user);
          this.userService.updateStatusLogin(true);
          this.tokenService.setTokenInLocalStorage(token);
        }),
        catchError((err: any) => {
          this.toast.error(err.error?.message || 'Login failed', 'Error');
          return of (null)
        }),
        finalize(()=>{
          this.isLoadingSubject.next(false);
        })
        
      ).subscribe();

  }
}


