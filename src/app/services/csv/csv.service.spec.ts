import { TestBed } from '@angular/core/testing';
import { CsvService } from './csv.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CsvService = TestBed.get(CsvService);
    expect(service).toBeTruthy();
  });
});
