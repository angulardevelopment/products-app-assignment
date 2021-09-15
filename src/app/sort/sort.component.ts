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
  selectedVal = '0';
  constructor(private data: DataService, private api: ApiService) { }

  ngOnInit(): void {
  }

  updateData(): void {
    this.api.getProducts()

      .subscribe((result: IProduct[]) => {
        let data;
        if (this.selectedVal === '1') {
          data = this.sortOnTitle(result);


        } else if (this.selectedVal === '2') {
          data = this.sortOnDate(result);
        } else {
          data = result;
        }

        this.data.productsList.next(data);
      });
  }

  sortOnDate(myArr): void {
    return myArr.sort((a, b) =>
    (new Date(b.dateLastEdited).getTime() - new Date(a.dateLastEdited).getTime()
      ? 1 : -1));
  }

  sortOnTitle(myArr): void {

    return myArr.sort((a, b) => a.name.localeCompare(b.name));


  }

}
