import { TestBed } from '@angular/core/testing';

import { DeactGuard } from './deact.guard';

describe('DeactGuard', () => {
  let guard: DeactGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
