import { TestBed, async, inject } from '@angular/core/testing';

import { AfterUserLoginGuard } from './after-user-login.guard';

describe('AfterUserLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfterUserLoginGuard]
    });
  });

  it('should ...', inject([AfterUserLoginGuard], (guard: AfterUserLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
