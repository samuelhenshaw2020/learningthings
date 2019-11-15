import { TestBed } from '@angular/core/testing';

import { UserInterceptorService } from './user-interceptor.service';

describe('UserInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInterceptorService = TestBed.get(UserInterceptorService);
    expect(service).toBeTruthy();
  });
});
