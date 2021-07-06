import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGridTemplateComponent } from './app-grid-template.component';

describe('AppGridTemplateComponent', () => {
  let component: AppGridTemplateComponent;
  let fixture: ComponentFixture<AppGridTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppGridTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
