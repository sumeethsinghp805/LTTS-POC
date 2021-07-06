import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoTemplateComponent } from './app-info-template.component';

describe('AppInfoTemplateComponent', () => {
  let component: AppInfoTemplateComponent;
  let fixture: ComponentFixture<AppInfoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInfoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
