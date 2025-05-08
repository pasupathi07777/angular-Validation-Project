import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  currectDataTypeSubject=new BehaviorSubject<string>('');
  currectDataTypeObservable = this.currectDataTypeSubject.asObservable();

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingObservable = this.isLoadingSubject.asObservable();

  dataSubject = new BehaviorSubject<any[] | null>([]);
  dataObservable = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private route: Router) {}

  fetchData(type: string | any): void {
    this.currectDataTypeSubject.next(type)
    this.isLoadingSubject.next(true);
    this.http
      .get<any>(`${environment.dummyApi}${type}`)
      .pipe(
        tap((res)=>{
          if (res) {
            this.dataSubject.next(res[type] || [])
            this.route.navigate(['/data-show'])
          }
        }),
        catchError((err) => {
          this.isLoadingSubject.next(false);
          console.error('Error fetching posts:', err);
          return of(null);
        }),
        finalize(()=>{
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe();
  }
}
