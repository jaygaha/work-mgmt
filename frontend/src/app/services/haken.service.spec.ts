import { TestBed } from '@angular/core/testing';

import { HakenService } from './haken.service';

describe('HakenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HakenService = TestBed.get(HakenService);
    expect(service).toBeTruthy();
  });
});
