import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search/search.service';
import { take } from 'rxjs/operators';
import { SearchItemType, SearchResult } from '../../models/search-result';
import { CsvService } from '../../services/csv/csv.service';
import { dateYmd } from '../../../utils/date-formatter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchQuery = '';
  public items: Array<SearchResult> = [];
  public loading = false;
  public loaded = false;
  public error: string;

  private subscription: Subscription;

  constructor(private search: SearchService, private csv: CsvService) {}

  ngOnInit() {}

  executeSearch($event: Event) {
    $event.preventDefault();

    this.loading = true;
    this.error = null;

    this.unsubscribe();

    this.subscription = this.search.search$(this.searchQuery)
      .pipe(take(1))
      .subscribe(response => {
        this.items = response;
        this.loading = false;
        this.loaded = true;
      }, error => {
        this.error = error;
        this.loading = false;
        this.loaded = true;
      });
  }

  clearSearch() {
    this.items = [];
  }

  saveSearch() {
    this.csv.download<SearchResult>(
      `${this.searchQuery}-${dateYmd(new Date())}`,
      { type: 'Type', name: 'Name', code: 'Identifier' },
      this.items,
    );
  }

  trackByFn(item, index) {
    return item.id;
  }

  typeVisual(type: SearchItemType) {
    return this.search.typeVisual(type);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
