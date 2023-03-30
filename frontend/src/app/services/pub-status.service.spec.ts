import { TestBed } from '@angular/core/testing';

import { PubStatusService } from './pub-status.service';

describe('PubStatusService', () => {
  let service: PubStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
