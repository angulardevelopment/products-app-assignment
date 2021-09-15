import { IProduct } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  searchText = localStorage.getItem('searchText');
  counter = 1;
  subscriptions: Subscription[] = [];
  elem = 0;
  constructor(private data: DataService, private api: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.data.productsList.subscribe((res) => { this.products = res; }));

    this.subscriptions.push(this.data.searchKeyword.subscribe((res) => {
      this.searchText = res;
      if ((this.searchText).indexOf('"') > -1) {
      this.products = this.exactSearch();
      }
    }));



    this.productsData();

  }

  exactSearch() {


      const tempText = this.searchText.replace(/"/g, "");


      const products = this.products.filter(el => el.description.indexOf(tempText) > 0);

      return products;


  }

  productsData() {
    this.api.getProducts()

      .subscribe((result: IProduct[]) => {

        this.products = result;

      });
  }

  counterUpdate(type): void {

    switch (type) {
      case 'next':
        this.counter += 1;
        this.elem = this.elem + 10;

        break;
      case 'prev':
        this.counter -= 1;
        this.elem = this.elem - 10;

        break;
      case 'last':
        this.counter = this.products.length / 10;
        this.elem = this.products.length - 10;

        break;
      case 'first':
        this.counter = 1;
        this.elem = 0;
        break;
      default:
        break;
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
