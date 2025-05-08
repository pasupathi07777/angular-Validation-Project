import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/services/auth/logout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  isLoading: boolean = false;

  constructor(private logoutService: LogoutService) {}

  logOut() {
    this.logoutService.logout();
  }

  ngOnInit(): void {}
}
