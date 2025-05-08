import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/services/data/fetch-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.css'],
})
export class DataShowComponent implements OnInit {
  data: any | null = [];
  type!: any;
  constructor(
    private dataService: FetchDataService,
    private route: Router,
    private location: Location
  ) {
    dataService.dataObservable.subscribe((datas) => {
      this.data = datas;
    });
    dataService.currectDataTypeObservable.subscribe((dataType) => {
      this.type = dataType;
    });
  }
  onNavigate(id: any) {
    this.route.navigate([`each-data/${id}`]);
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.length === 0) {
      this.location.back(); 
      return;
    }
  }
}
