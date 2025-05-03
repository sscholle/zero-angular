import { TestBed } from '@angular/core/testing';

import { ZeroService } from './zero.service';
import { Schema } from '@rocicorp/zero';

describe('ZeroAngularService', () => {
  let service: ZeroService<Schema>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
