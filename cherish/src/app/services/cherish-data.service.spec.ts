import { TestBed } from '@angular/core/testing';

import { CherishDataService } from './cherish-data.service';

describe('CherishDataService', () => {
  let service: CherishDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CherishDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
