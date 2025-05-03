import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { validateForm } from 'src/app/utils/validation';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/interfaces/auth-response';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {
 isLoading:boolean=false
  constructor(private toast: ToastrService, private http: HttpClient,private authServices:AuthServiceService,private route:Router) {}

  handleLogin(form: NgForm): void {
    
    if (form.invalid) {
      this.toast.error('Please fill all required fields correctly');
      return;
    }
    
    if (!validateForm(form.value, 'login', this.toast)) return;
this.isLoading=true
    this.http.post<LoginResponse>('https://angular-auth-server.onrender.com/api/auth/login', form.value)
      .subscribe({
        next: (res) => {
          this.isLoading=false
          this.toast.success('Login successful!', 'Success');
          console.log('API Response:', res);
          const { token, user } = res;
          this.authServices.updateCurrentUser(user)
          this.authServices.setTokenInLocalStorage(token)
          this.route.navigate([''])

        },
        error: (err) => {
          this.isLoading=false
          this.toast.error(err.error?.message || 'Login failed', 'Error');
          console.error('Login error:', err);
        }
      });
  }
}