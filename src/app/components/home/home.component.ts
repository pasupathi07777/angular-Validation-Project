import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  isLoading: boolean = false;

  constructor(
    private route: Router,
    private postService: PostsService,
    private authService: AuthServiceService
  ) {
    this.postService.isLoadingObservable.subscribe((current: boolean) => {
      this.isLoading = current;
    });
  }

  logOut() {
    this.authService.logout(this.route);
  }

  ngOnInit(): void {
    this.postService.postObservable.subscribe((data) => {
      this.posts = data;
    });
  }

  fetchData(): void {
    this.postService.fetchPost();
  }

  navigateEachPost(id: number): void {
    this.route.navigate([`/post/${id}`]);
  }

}
