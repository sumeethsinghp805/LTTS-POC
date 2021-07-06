import { TestBed } from '@angular/core/testing';

import { AppRestApiService } from './app-rest-api.service';

describe('AppRestApiService', () => {
  let service: AppRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
