import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  isLoading:boolean=false

  constructor(
    private http: HttpClient,
    private route: Router,
    private postService: PostsService,
    private authService:AuthServiceService
  ) {}

  logOut(){
    this.authService.logout(this.route)
  }

  ngOnInit(): void {

    this.postService.postObservable.subscribe((data) => {
      this.posts = data;
    });

    
  }

  fetchData(): void {
this.isLoading=true
    this.http.get<any>('https://dummyjson.com/posts')
      .pipe(
        catchError((err) => {
          this.isLoading=false
          console.error('Error fetching posts:', err);
          return of(null);
        })
      )
      .subscribe((res: any) => {
        this.isLoading=false
        if (res && res.posts) {
          this.postService.updatePost(res.posts);
        }
      });
  }

  navigateEachPost(id: number): void {
    this.route.navigate([`/post/${id}`]);
  }
}
