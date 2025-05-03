import { signupResponse } from '../../interfaces/auth-response';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { validateForm } from '../../utils/validation';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  isLoading:boolean=false
  constructor(private toast: ToastrService, private http: HttpClient,private router:Router) {}

  handleRegister(data: NgForm): void {
    console.log(data.value);

    const result: boolean = validateForm(data.value, 'signup', this.toast);
    if (!result) return;
this.isLoading=true
    this.http
      .post<signupResponse>(
        'https://angular-auth-server.onrender.com/api/auth/signup',
        data.value
      )
      .pipe(
        catchError((err) => {
          this.isLoading=false
          this.toast.error(err.error?.message || 'Signup failed', 'Error');
          return of(null);
        })
      )
      .subscribe((res: any) => {
        this.isLoading=false
        if (res) {
          this.toast.success('Signup successful!', 'Success');
          data.reset();
          this.router.navigate(['/login'])
        }
      });
  }

  ngOnInit(): void {}
}
