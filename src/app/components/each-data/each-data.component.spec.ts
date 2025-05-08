import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachDataComponent } from './each-data.component';

describe('EachDataComponent', () => {
  let component: EachDataComponent;
  let fixture: ComponentFixture<EachDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
