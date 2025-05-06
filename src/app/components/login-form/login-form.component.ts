import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private authServices: AuthServiceService,
    private route:Router
  ) {
   this.authServices.isLoadingObservable.subscribe((current:boolean)=>{
    this.isLoading= current
    })
  }

  handleLogin(form: NgForm): void {
    this.authServices.logIn(form)
  }

  ngOnInit(): void {
    this.authServices.isLoginStatusObservable.subscribe((status)=>{
      if(status){
        this.route.navigate([''])
      }
    })
  }
}
