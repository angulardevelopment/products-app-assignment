import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './interfaces/product';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param keyword search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) { return []; }
    if (!keyword) { return items; }

    return items.filter(item => {
      let itemFound: boolean;

      if (keyword.indexOf('"') < 0) {
        for (let i = 0; i < properties.length; i++) {
          if (item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            itemFound = true;
            break;
          }
        }
      } else {
        return items;
      }
      return itemFound;

    });

  }
}
