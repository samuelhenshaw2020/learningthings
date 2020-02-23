import { TestBed, async, inject } from '@angular/core/testing';

import { BeforeUserLoginGuard } from './before-user-login.guard';

describe('BeforeUserLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeforeUserLoginGuard]
    });
  });

  it('should ...', inject([BeforeUserLoginGuard], (guard: BeforeUserLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
