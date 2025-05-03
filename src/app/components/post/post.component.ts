import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators'; 
import { of } from 'rxjs'; 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postId!: number;
  post: any;
  isLoading:boolean=false

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Post ID:', id);
    
    if (id) {
      this.postId = Number(id); 
      this.fetchData(this.postId); 
    }
  }

  fetchData(id: number): void {
    this.isLoading=true
    this.http.get<any>(`https://dummyjson.com/posts/${id}`)
      .pipe(
        catchError((err: any) => { 
          this.isLoading=false

          console.error('Error fetching post:', err);
          return of(null); 
        })
      )
      .subscribe((res: any) => {
        this.isLoading=false
        if (res) {
          this.post = res; 
          console.log('Fetched Post:', this.post);
        } else {
          console.log('No post found or error occurred');
        }
      });
  }
}
