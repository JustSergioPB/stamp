import { TestBed } from '@angular/core/testing';

import { SchemaApiService } from './schema-api.service';

describe('SchemaApiService', () => {
  let service: SchemaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
