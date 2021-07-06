import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartTemplateComponent } from './app-chart-template.component';

describe('AppChartTemplateComponent', () => {
  let component: AppChartTemplateComponent;
  let fixture: ComponentFixture<AppChartTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppChartTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChartTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
