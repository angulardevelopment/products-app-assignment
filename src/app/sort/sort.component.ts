import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IProduct } from '../interfaces/product';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectedVal = 1;
  constructor(private data: DataService, private api: ApiService) { }

  ngOnInit(): void {
  }

  updateData(): void {
    this.api.getProducts()

      .subscribe((result: IProduct[]) => {

        if (this.selectedVal === 1) {
          this.sortOnTitle(result);
        } else if (this.selectedVal === 2) {
          this.sortOnDate(result);
        }
        this.data.productsList.next(result);
      });
  }

  sortOnDate(myArr): void {
    myArr.sort((a, b) => new Date(b.dateLastEdited).getTime() - new Date(a.dateLastEdited).getTime());
  }

  sortOnTitle(myArr): void {
    myArr.sort((a, b) => (a.name < b.name ? -1 : 1));

  }

}
