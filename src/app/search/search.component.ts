import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText = '';
  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit(): void {

  }

  onSearch(): void {
    this.data.searchKeyword.next(this.searchText);
    localStorage.setItem('searchText', this.searchText);
  }



}
