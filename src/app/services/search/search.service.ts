import { Injectable, Injector } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { SearchItemType, SearchResult } from '../../models/search-result';
import { MerchantService } from '../merchant/merchant.service';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly searchableTypes = [
    MerchantService,
    UserService,
  ];

  private readonly typeVisuals = {
    merchant: '🏭',
    user: '😎',
  };

  constructor(private injector: Injector) { }

  search$(query: string): Observable<SearchResult[]> {

    const services = this.searchableTypes.map(item => this.injector.get(item).search$(query));

    return forkJoin(services)
      .pipe(
        map((items) => [].concat(...items)),
        map((items: SearchResult[]) => items.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  typeVisual(type: SearchItemType) {
    return this.typeVisuals[type] || '❔';
  }
}
