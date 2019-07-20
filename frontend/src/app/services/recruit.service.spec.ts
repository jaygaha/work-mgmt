import { TestBed } from '@angular/core/testing';

import { RecruitService } from './recruit.service';

describe('RecruitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruitService = TestBed.get(RecruitService);
    expect(service).toBeTruthy();
  });
});
