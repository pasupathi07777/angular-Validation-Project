import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private loginService: LoginService,
    private route: Router,
    private userService: UserService
  ) {
    this.loginService.isLoadingObservable.subscribe((current: boolean) => {
      this.isLoading = current;
    });
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  handleLogin(): void {
    this.loginService.logIn(this.loginForm.value);
  }

  ngOnInit(): void {
    this.userService.isLoginStatusObservable.subscribe((status) => {
      if (status) {
        this.route.navigate(['']);
      }
    });
  }
}
