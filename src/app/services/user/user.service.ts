import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '@search-app/data';
import { map } from 'rxjs/operators';
import { SearchResult } from '../../models/search-result';
import { SearchServiceInterface } from '../../interfaces/search-service.interface';

@Injectable({providedIn: 'root'})
export class UserService implements SearchServiceInterface {

  constructor(private repo: UserRepository) {
  }

  public search$(query: string): Observable<SearchResult[]> {
    return this.repo.search$(query)
      .pipe(
        map((items) => items.map(
          (item) => ({id: item.id, type: 'user', name: item.name, code: item.personId})),
        ),
      );
  }
}
