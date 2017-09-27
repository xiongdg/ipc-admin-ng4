import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGardGuard } from './auth-gard.guard';

describe('AuthGardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGardGuard]
    });
  });

  it('should ...', inject([AuthGardGuard], (guard: AuthGardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
