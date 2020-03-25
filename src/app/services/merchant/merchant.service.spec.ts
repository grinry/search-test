import { TestBed } from '@angular/core/testing';

import { MerchantService } from './merchant.service';
import { HttpClientModule } from '@angular/common/http';

describe('MerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MerchantService = TestBed.get(MerchantService);
    expect(service).toBeTruthy();
  });
});
