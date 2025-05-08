import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/auth/signup.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-signup-form',
  standalone: false,
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private router: Router, private signupService: SignupService,private userService:UserService) {
    this.signupService.isLoadingObservable.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  signupForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(6),
    ]),
  });

  get userName() {
    return this.signupForm.get('userName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  handleRegister(): void {
    this.signupService.signup(this.signupForm.value);
  }

  ngOnInit(): void {

  }
}
