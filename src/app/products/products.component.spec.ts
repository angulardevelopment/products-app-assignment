import { FilterPipe } from './../filter.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../api.service';
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const mockData = [ {
    "name": "smith vale errrsd sdad",
    "image": "http://lorempixel.com/640/480",
    "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
    "dateLastEdited": "2018-05-29T12:33:25.545Z"
  },
  {
    "name": "adam christ lorem ispum",
    "image": "http://lorempixel.com/640/480",
    "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
    "dateLastEdited": "2017-11-28T04:59:13.759Z"
  }];
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],

      declarations: [ ProductsComponent, FilterPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work when user search with quotes text', () => {
    component.searchText = '"nisi delectus"';
    component.products = mockData;
    const searchItems = component.exactSearch();

    expect(searchItems[0].description).toEqual("Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.");
  });

  it('should get all products', () => {
    spyOn(apiService, 'getProducts').and.callThrough();
    component.productsData();
    expect(apiService.getProducts).toHaveBeenCalled();
  });
});
