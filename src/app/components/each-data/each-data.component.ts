import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';
import { FetchDataService } from 'src/app/services/data/fetch-data.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-each-data',
  templateUrl: './each-data.component.html',
  styleUrls: ['./each-data.component.css'],
})
export class EachDataComponent implements OnInit {
  postId!: number;
  isLoading: boolean = false;
  dataType: any = '';
  data:any=null

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fetchDataService: FetchDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchDataService.currectDataTypeObservable.subscribe((types) => {
      this.dataType = types;
      const id = this.route.snapshot.paramMap.get('id');
      if(!this.dataType){
        this.location.back(); 
        return;
      }
      if (id) {
        this.postId = Number(id);
        this.fetchData(this.postId);
      }
    });
  }
  fetchData(id: number): void {
    this.isLoading = true;
    this.http
      .get<any>(`${environment.dummyApi}${this.dataType}/${id}`)
      .pipe(
        tap((res)=>{
          if (res) {
            this.data = res;
          } 
        }),
        catchError((err: any) => {
          return of(null);
        }),
        finalize(()=>{
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
