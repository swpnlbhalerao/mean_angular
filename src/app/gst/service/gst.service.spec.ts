import { TestBed } from '@angular/core/testing';

import { GSTService } from './gst.service';

describe('GSTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GSTService = TestBed.get(GSTService);
    expect(service).toBeTruthy();
  });
});
