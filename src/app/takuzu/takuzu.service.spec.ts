import { TestBed } from '@angular/core/testing';

import { TakuzuService } from './takuzu.service';

describe('TakuzuService', () => {
  let service: TakuzuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakuzuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
