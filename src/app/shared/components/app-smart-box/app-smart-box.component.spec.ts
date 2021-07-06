import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSmartBoxComponent } from './app-smart-box.component';

describe('AppSmartBoxComponent', () => {
  let component: AppSmartBoxComponent;
  let fixture: ComponentFixture<AppSmartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSmartBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSmartBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
