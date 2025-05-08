import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchDataService } from 'src/app/services/data/fetch-data.service';

@Component({
  selector: 'app-fetch-data-form',
  templateUrl: './fetch-data-form.component.html',
  styleUrls: ['./fetch-data-form.component.css'],
})
export class FetchDataFormComponent implements OnInit {
  isLoading: boolean = false;
  dataType: string = '';
  dataForm: FormGroup = new FormGroup({
    dataName: new FormControl('', [Validators.required])
  });

  constructor(
    private fetchDataService: FetchDataService,
  ) {}

  ngOnInit(): void {

    this.fetchDataService.isLoadingObservable.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.fetchDataService.currectDataTypeObservable.subscribe((dataType) => {
      this.dataType = dataType;
      this.dataForm.patchValue({ dataName: dataType });
    });
  }

  get dataName() {
    return this.dataForm.get('dataName');
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const { dataName } = this.dataForm.value;
      this.fetchDataService.fetchData(dataName);
    }
  }


}
