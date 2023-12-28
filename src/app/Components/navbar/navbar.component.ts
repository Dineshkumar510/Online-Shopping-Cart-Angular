import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemsService } from '../Services/cart-items.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @ViewChild("priceTag") priceTag: ElementRef;

  counter = 1;
  TotalAddedtoCart:any[] = [];
  IncrementArray:any[] = [];
  DecrementArray:any[] = [];
  IncrementValue:any = 0;
  DecrementValue:any = 0;
  elementPrice:any;
  totalPrice:any;
  couponCodeBar:boolean = false;
  couponValue:any = 0;
  //ShippingCharges:any = 0;
  //sidebarShow: boolean;

  constructor(
    private router: Router,
    private cartItemsService: cartItemsService,
  ) { }

  ngOnInit(): void {
    this.OnCardItem();
  }


  OnCardItem(){
    this.TotalAddedtoCart = this.cartItemsService.getCartItems;
   }


  ShoppingCartToggle(event:any){
    if(event){
      event.stopPropagation();
      this.cartItemsService.ShoppingCartToggle();
    }
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }

  get TotalCost(): number{
    return this.Totalprice(this.TotalAddedtoCart)
  }

  Totalprice(array:any[]){
    var totalCost = 0;
    for(var i = 0; i < array.length; i++){
      totalCost += array[i].price;
    }
    return Math.round(totalCost);
  }

  //Alternative method to get the total cost of products
  // TotalPriceProduct(){
  //   const TotalValue = this.TotalAddedtoCart.reduce((prev:any, curr:any)=>{
  //     return prev + curr.price
  //   },0)
  //   return TotalValue;
  // }

  CouponCode(){
    this.couponCodeBar = !this.couponCodeBar;
    if(this.couponCodeBar == true && this.TotalCost >= 500){
      this.couponValue = 100;
    } else{
      this.couponValue = 0;
    }
  }

  // ShippingFees(){
  //   if(this.TotalCost >= 500){
  //     this.ShippingCharges = 150;
  //   } else{
  //     this.ShippingCharges = 0;
  //   }
  // }


  get ShippingCharges():number {
    return this.TotalCost<500 ? 0 : 150;
  }

  plus(index: number, item:any) {
    this.cartItemsService.IncrementCount(index);
    if(item){
      this.IncrementArray.push(item);
      return this.IncrementValues;
      }
    return 0;
  }

  get IncrementValues(){
    return this.IncrementValue = this.IncrementArray.reduce((prev:any, curr:any)=>{
      return prev + curr.price
    },0)
  }

  minus(index: number, item: any): number {
    this.cartItemsService.DecrementCount(index);
    if (item) {
      this.DecrementArray.push(item);
      return this.DecrementValues;
    }
    return 0;
  }
  get DecrementValues(): number {
    return this.DecrementValue = this.DecrementArray.reduce((prev: any, curr: any) => {
      return prev + curr.price;
    }, 0);
  }

  get FinalPrice(): number{
    return Math.round(this.TotalCost + this.ShippingCharges + this.IncrementValue - this.couponValue - this.DecrementValue);
  }


  removeEle(i:number){
    this.TotalAddedtoCart.splice(i, 1);
  }

  removeElewithDelay(i:number){
    setTimeout(()=>{
      this.TotalAddedtoCart.splice(i, 1);
    }, 1000)
  }


}
