import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';

import { AllProductComponent } from './all-product.component';

describe('AllProductComponent', () => {
  let component: AllProductComponent;
  let fixture: ComponentFixture<AllProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular Unit Testing'`), async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app);
    expect(app).toEqual('Angular Unit Testing');
  });

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular Unit Testing!');
  }));
});
