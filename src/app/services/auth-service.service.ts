import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import {
  LoginResponse,
  signupResponse,
  userData,
} from '../interfaces/auth-response';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validateForm } from '../utils/validation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private toast: ToastrService,
    private http: HttpClient,
    private route: Router
  ) {}

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingObservable = this.isLoadingSubject.asObservable();
  isLoginStatusSubject = new BehaviorSubject<boolean>(false);
  isLoginStatusObservable = this.isLoginStatusSubject.asObservable();
  userLogin: boolean = false;
  userSubject = new BehaviorSubject<userData | null>(null);
  currentUserObservable = this.userSubject.asObservable();

  getCurrentUser(): userData | null {
    return this.userSubject.getValue();
  }

  updateCurrentUser(user: userData | null): void {
    this.userSubject.next(user);
    this.isLoginStatusSubject.next(true)
    console.log(this.getCurrentUser());
  }

  setTokenInLocalStorage(token: string): void {
    localStorage.setItem('jwt', token);
  }
  getTokenInLocalStorage(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(route: Router): void {
    localStorage.removeItem('jwt');
    this.userSubject.next(null);
    this.userLogin = false;
    this.isLoginStatusSubject.next(false)
    route.navigate(['/login']);
  }

  logIn(form: NgForm) {
    this.isLoadingSubject.next(true);
    
    if (form.invalid) {
      this.toast.error('Please fill all required fields correctly');
      return;
    }

    if (!validateForm(form.value, 'login', this.toast)) return;
    this.http
      .post<LoginResponse>(
        `${environment.baseUrl}api/auth/login`,
        form.value
      )
      .subscribe({
        next: (res) => {
          this.isLoadingSubject.next(false);
          this.isLoadingSubject.next(true)
          this.toast.success('Login successful!', 'Success');
          console.log('API Response:', res);
          const { token, user } = res;
          this.updateCurrentUser(user);
          this.setTokenInLocalStorage(token);
          this.route.navigate(['']);
        },
        error: (err) => {
          this.isLoadingSubject.next(false);
          this.toast.error(err.error?.message || 'Login failed', 'Error');
          console.error('Login error:', err);
        },
      });
  }

  signup(data: any): void {
    const result: boolean = validateForm(data.value, 'signup', this.toast);
    if (!result) return;
    this.isLoadingSubject.next(true);

    this.http
      .post<signupResponse>(
        `${environment.baseUrl}api/auth/signup`,
        data.value
      )
      .pipe(
        catchError((err) => {
          this.isLoadingSubject.next(false);
          this.toast.error(err.error?.message || 'Signup failed', 'Error');
          return of(null);
        })
      )
      .subscribe((res: any) => {
        this.isLoadingSubject.next(false);
        if (res) {
          this.toast.success('Signup successful!', 'Success');
          data.reset();
          this.route.navigate(['/login']);
        }
      });
  }

  verifyToken(token: string): void {
this.isLoadingSubject.next(true)
    this.http.get<LoginResponse>(`${environment.baseUrl}api/auth/verify-token?token=${token}`)
      .subscribe({
        next: (res: any) => {
          this.isLoadingSubject.next(false)
          console.log(res);
          const {user}=res
          this.updateCurrentUser(user)
        },
        error: (err) => {
          this.isLoadingSubject.next(false)
          localStorage.removeItem('jwt');
          this.route.navigate(['/login']);
          console.error('Token verification failed:', err);
        }
      });
  }
}
