import { TestBed, inject } from '@angular/core/testing';

import { AccesstokenService } from './accesstoken.service';

describe('AccesstokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesstokenService]
    });
  });

  it('should be created', inject([AccesstokenService], (service: AccesstokenService) => {
    expect(service).toBeTruthy();
  }));
});
