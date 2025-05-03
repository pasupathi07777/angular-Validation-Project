import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoderComponent } from './app-loder.component';

describe('AppLoderComponent', () => {
  let component: AppLoderComponent;
  let fixture: ComponentFixture<AppLoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
