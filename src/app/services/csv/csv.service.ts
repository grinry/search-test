import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import slugify from '../../../utils/slugify';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private linkElement: HTMLAnchorElement;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  /**
   *
   * @param filename string
   * @param labels array
   * @param items array
   */
  public download<T>(
    filename: string,
    labels: Array<string> | {[key: string]: string},
    items: Array<T>
  ) {
    const data = this.buildArray(labels, items);
    const content = this.arrayToCsvString(data);
    if (!this.linkElement) {
      this.linkElement = this.document.createElement('a');
      this.document.body.appendChild(this.linkElement);
    }
    this.linkElement.href = URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
    this.linkElement.setAttribute('download', slugify(filename) + '.csv');
    this.linkElement.click();
  }

  /**
   * @param labels array
   * @param items string
   */
  protected buildArray<T>(
    labels: Array<string> | {[key: string]: string},
    items: Array<T>,
  ): Array<Array<string>> {
    const document = [];

    let headers = labels;
    let keys: Array<string> = labels as Array<string>;
    if (!Array.isArray(labels)) {
      headers = Object.values(labels);
      keys = Object.keys(labels);
    }

    document.push(headers);

    const rows = items.map((item) => {
      const value = [];
      for (const key of keys) {
        if (item.hasOwnProperty(key)) {
          value.push(item[key]);
        } else {
          value.push('');
        }
      }
      return value;
    });

    document.push(...rows);
    return document;
  }

  protected arrayToCsvString(rows: Array<Array<string>>, separator: string = ','): string {
    return rows
      .map(e => e.map(i => JSON.stringify(i)).join(separator))
      .join('\n');
  }
}
