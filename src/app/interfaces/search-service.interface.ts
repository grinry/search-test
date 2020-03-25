import { Observable } from 'rxjs';
import { SearchResult } from '../models/search-result';

export interface SearchServiceInterface {
  search$(query: string): Observable<SearchResult[]>;
}
