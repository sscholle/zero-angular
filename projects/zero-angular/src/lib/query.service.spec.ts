import { TestBed } from '@angular/core/testing';

import { ZeroService } from './zero.service';
import { QueryService } from './query.service';

describe('ZeroAngularService', () => {
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            {
            provide: ZeroService,
            useValue: {
                getZero: () => ({
                query: () => ({}),
                }),
            },
            },
        ],
    });
    service = TestBed.inject(QueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
