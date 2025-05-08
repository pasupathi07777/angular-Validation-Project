import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchDataFormComponent } from './fetch-data-form.component';

describe('FetchDataFormComponent', () => {
  let component: FetchDataFormComponent;
  let fixture: ComponentFixture<FetchDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
