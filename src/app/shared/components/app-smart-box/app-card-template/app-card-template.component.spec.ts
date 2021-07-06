import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardTemplateComponent } from './app-card-template.component';

describe('AppCardTemplateComponent', () => {
  let component: AppCardTemplateComponent;
  let fixture: ComponentFixture<AppCardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCardTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
