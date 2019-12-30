import { TestBed } from '@angular/core/testing';

import { AdminSseService } from './admin-sse.service';

describe('AdminSseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSseService = TestBed.get(AdminSseService);
    expect(service).toBeTruthy();
  });
});
