import { TestBed } from '@angular/core/testing';

import { AppObserverService } from './app-observer.service';

describe('APPObserverService', () => {
  let service: AppObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
