import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  isLoading:boolean=false
  constructor( private http: HttpClient,private router:Router,private authService:AuthServiceService) {
    this.authService.isLoadingObservable.subscribe((loading)=>{
      this.isLoading=loading
    })
  }

  handleRegister(data: NgForm): void {

    this.authService.signup(data)


  }

  ngOnInit(): void {
    this.authService.isLoginStatusObservable.subscribe((status)=>{
      if(status){
        this.router.navigate([''])
      }
    })
  }
}
