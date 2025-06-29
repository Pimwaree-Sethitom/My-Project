import { TestBed } from '@angular/core/testing';

import { PublicPaperService } from './public-paper.service';

describe('PublicPaperService', () => {
  let service: PublicPaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicPaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
