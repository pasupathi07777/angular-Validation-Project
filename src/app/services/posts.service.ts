import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingObservable = this.isLoadingSubject.asObservable();

  private postSubject = new BehaviorSubject<any[]>([]);
  postObservable = this.postSubject.asObservable();

    constructor(
      private http: HttpClient,
      private route: Router
    ) {}

  updatePost(posts: any[]) {
    const oldPosts = this.postSubject.getValue();
    const newPosts = [...posts, ...oldPosts];
    this.postSubject.next(newPosts);
  }

  getPosts(): any[] {
    return this.postSubject.getValue();
  }

 

    fetchPost(): void {
this.isLoadingSubject.next(true)
      this.http.get<any>(`${environment.dummyApi}posts`)
        .pipe(
          catchError((err) => {
            this.isLoadingSubject.next(false)
            console.error('Error fetching posts:', err);
            return of(null);
          })
        )
        .subscribe((res: any) => {
          this.isLoadingSubject.next(false)
          if (res && res.posts) {
            this.updatePost(res.posts);
          }
        });
    }
}
