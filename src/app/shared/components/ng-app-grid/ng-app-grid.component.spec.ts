import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAppGridComponent } from './ng-app-grid.component';

describe('NgAppGridComponent', () => {
  let component: NgAppGridComponent;
  let fixture: ComponentFixture<NgAppGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAppGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAppGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
