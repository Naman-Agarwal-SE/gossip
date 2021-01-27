import { TestBed } from '@angular/core/testing';

import { CreatepostServiceService } from './createpost-service.service';

describe('CreatepostServiceService', () => {
  let service: CreatepostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatepostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
