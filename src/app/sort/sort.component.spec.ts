import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;
  const mockData = [ {
    "name": "smith",
    "image": "http://lorempixel.com/640/480",
    "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
    "dateLastEdited": "2018-05-29T12:33:25.545Z"
  },
  {
    "name": "adam",
    "image": "http://lorempixel.com/640/480",
    "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
    "dateLastEdited": "2017-11-28T04:59:13.759Z"
  }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],

      declarations: [ SortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort data on basis of name', () => {
    const data = component.sortOnTitle(mockData);
    expect(data[0].name).toEqual('adam');
    expect(data[1].name).toEqual('smith');

  });

  it('should sort data on basis of date', () => {
    const data = component.sortOnTitle(mockData);
    expect(data[0].dateLastEdited).toEqual('2017-11-28T04:59:13.759Z');
    expect(data[1].dateLastEdited).toEqual('2018-05-29T12:33:25.545Z');

  });
});
