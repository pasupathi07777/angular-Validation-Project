import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service'; 
import { LoginResponse } from './interfaces/auth-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pro-3';
  isLoading:boolean=false

  constructor(
    private router: Router,
    private authService: AuthServiceService  
  ) {
    this.authService.isLoadingObservable.subscribe((loading)=>{
      this.isLoading=loading
    })
  }

  ngOnInit(): void {

    const token:string | null  = this.authService.getTokenInLocalStorage();
    console.log(token);
    
    if (token) {
      console.log(token);
      
      this.authService.verifyToken(token)
    } else {
      this.router.navigate(['/login']);
    }
  }



  
}
