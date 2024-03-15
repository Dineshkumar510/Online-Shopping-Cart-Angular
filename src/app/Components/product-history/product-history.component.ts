import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
  status: string;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
    status: 'Delivered',
	},
	{
		name: 'France',
		flag: 'c/c3/Flag_of_France.svg',
		area: 640679,
		population: 64979548,
    status: 'Ordered',
	},
	{
		name: 'Germany',
		flag: 'b/ba/Flag_of_Germany.svg',
		area: 357114,
		population: 82114224,
    status: 'In-Progress',
	},
	{
		name: 'Portugal',
		flag: '5/5c/Flag_of_Portugal.svg',
		area: 92090,
		population: 10329506,
    status: 'Cancelled',
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
    status: 'Delivered',
	},
	{
		name: 'Vietnam',
		flag: '2/21/Flag_of_Vietnam.svg',
		area: 331212,
		population: 95540800,
    status: 'Cancelled',
	},
	{
		name: 'Brazil',
		flag: '0/05/Flag_of_Brazil.svg',
		area: 8515767,
		population: 209288278,
    status: 'Ordered',
	},
	{
		name: 'Mexico',
		flag: 'f/fc/Flag_of_Mexico.svg',
		area: 1964375,
		population: 129163276,
    status: 'Cancelled',
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
    status: 'Delivered',
	},
	{
		name: 'India',
		flag: '4/41/Flag_of_India.svg',
		area: 3287263,
		population: 1324171354,
    status: 'Ordered',
	},
	{
		name: 'Indonesia',
		flag: '9/9f/Flag_of_Indonesia.svg',
		area: 1910931,
		population: 263991379,
    status: 'Delivered',
	},
	{
		name: 'Tuvalu',
		flag: '3/38/Flag_of_Tuvalu.svg',
		area: 26,
		population: 11097,
    status: 'Cancelled',
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
    status: 'Delivered',
	},
];

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {

  pageLen = [
    5,
    10,
    15,
  ]

  selected = 10;

  page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	countries: Country[];

  constructor(
    private router: Router,
  ) {
    this.refreshCountries();
  }

  ngOnInit(): void {
  }

  refreshCountries() {
		this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  getStatus(data:any){
    switch(data){
      case 'Ordered':
      return '#00aae7';
      case 'In-Progress':
      return '#e2e625';
      case 'Delivered':
      return '#1dbb99';
      case 'Cancelled':
      return '#f35958';
    }
    return;
  }

  back(){
    this.router.navigate(['/profile']);
  }


}
