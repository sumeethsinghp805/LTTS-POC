import { TestBed } from '@angular/core/testing';

import { CacheDataServiceService } from './cache-data-service.service';

describe('CacheDataServiceService', () => {
  let service: CacheDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
