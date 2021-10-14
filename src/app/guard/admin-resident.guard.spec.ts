import { TestBed } from '@angular/core/testing';

import { AdminResidentGuard } from './admin-resident.guard';

describe('AdminResidentGuard', () => {
  let guard: AdminResidentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminResidentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
