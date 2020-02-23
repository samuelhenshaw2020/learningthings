import { TestBed, async, inject } from '@angular/core/testing';

import { SiteTypeGuard } from './site-type.guard';

describe('SiteTypeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteTypeGuard]
    });
  });

  it('should ...', inject([SiteTypeGuard], (guard: SiteTypeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
