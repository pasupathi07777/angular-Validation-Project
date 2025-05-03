import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postSubject = new BehaviorSubject<any[]>([]);
  postObservable = this.postSubject.asObservable();

  updatePost(posts: any[]) {
    const oldPosts = this.postSubject.getValue();
    const newPosts = [...posts, ...oldPosts];
    this.postSubject.next(newPosts);
  }

  getPosts(): any[] {
    return this.postSubject.getValue();
  }

  constructor() { }
}
