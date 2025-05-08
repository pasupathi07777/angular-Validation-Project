import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { signupResponse } from 'src/app/interfaces/auth-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingObservable = this.isLoadingSubject.asObservable();
  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private route: Router
  ) {}

  signup(data: any): void {
    this.isLoadingSubject.next(true);
    this.http
      .post<signupResponse>(`${environment.baseUrl}auth/signup`, data)
      .pipe(tap((res)=>{
        if (res) {
          this.toast.success('Signup successful!', 'Success');
          this.route.navigate(['/login']);
        }
      }),
        catchError((err) => {
          this.toast.error(err.error?.message || 'Signup failed', 'Error');
          return of(null);
        }),
        finalize(()=>{
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe()
      
  }
}
