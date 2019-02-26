import { TestBed, inject } from '@angular/core/testing';

import { GrantPageAccessService } from './grant-access.service';

describe('GrantAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrantPageAccessService]
    });
  });

  it('should be created', inject([GrantPageAccessService], (service: GrantPageAccessService) => {
    expect(service).toBeTruthy();
  }));
});
