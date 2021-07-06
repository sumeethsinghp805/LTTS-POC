import { TestBed } from '@angular/core/testing';

import { SmartBoxService } from './smart-box.service';

describe('SmartBoxService', () => {
  let service: SmartBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
