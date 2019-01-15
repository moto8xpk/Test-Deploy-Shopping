import { TestBed } from '@angular/core/testing';

import { EncodeService } from './encode.service';

describe('EncodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncodeService = TestBed.get(EncodeService);
    expect(service).toBeTruthy();
  });
});
