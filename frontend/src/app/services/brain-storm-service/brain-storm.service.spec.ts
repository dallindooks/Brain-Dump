import { TestBed } from '@angular/core/testing';

import { BrainStormService } from './brain-storm.service';

describe('BrainStormService', () => {
  let service: BrainStormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrainStormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
