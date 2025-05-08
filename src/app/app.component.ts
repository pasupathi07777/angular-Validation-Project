import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/auth/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pro-3';
  isLoading: boolean = false;

  constructor(
    private tokenService: TokenService,
  ) {
    this.tokenService.isLoadingObservable.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
    this.tokenService.verifyOurState()
  }
}
