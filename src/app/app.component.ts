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
    private http: HttpClient,
    private authService: AuthServiceService  
  ) {}

  ngOnInit(): void {
    console.log("All load pasupathi");

    const token:string | null  = this.authService.getTokenInLocalStorage();
    
    if (token) {
      this.verifyToken(token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  verifyToken(token: string): void {
    this.isLoading=true
    this.http.get<LoginResponse>(`https://angular-auth-server.onrender.com/api/auth/verify-token?token=${token}`)
      .subscribe({
        next: (res: any) => {
          this.isLoading=false
          console.log(res);
          const {user}=res
          this.authService.updateCurrentUser(user)
        },
        error: (err) => {
          this.isLoading=false
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
          console.error('Token verification failed:', err);
        }
      });
  }

  fetchData(){
    
  }
  
}
