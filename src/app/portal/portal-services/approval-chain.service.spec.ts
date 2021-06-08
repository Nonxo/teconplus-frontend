import { TestBed } from '@angular/core/testing';

import { ApprovalChainService } from './approval-chain.service';

describe('ApprovalChainService', () => {
  let service: ApprovalChainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalChainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
