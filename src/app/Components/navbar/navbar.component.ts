import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemsService } from '../Services/cart-items.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild("priceTag") priceTag: ElementRef;

  counter = 1;
  TotalAddedtoCart:any[] = [];
  finalCart:any[] = [];
  elementPrice:any;
  totalPrice:any;
  couponCodeBar:boolean = false;
  couponValue:any = 0;
  ShippingCharges:any = 0;
  //sidebarShow: boolean;

  constructor(
    private router: Router,
    private cartItemsService: cartItemsService,
  ) { }

  ngOnInit(): void {
    this.OnCardItem();
  }

  reloadPage() {
    window.location.reload();
 }

  OnCardItem(){
    this.TotalAddedtoCart = this.cartItemsService.getCartItems();
   }


  ShoppingCartToggle(event:any){
    if(event){
      event.stopPropagation();
      this.cartItemsService.ShoppingCartToggle();
    }
    console.log("After Loaded!!",this.TotalAddedtoCart)
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }

  get TotalCost(): number{
    return this.Totalprice(this.TotalAddedtoCart);
  }

  Totalprice(array:any[]){
    var totalCost = 0;
    for(var i = 0; i < array.length; i++){
      totalCost += array[i].price;
    }
    return Math.round(totalCost);
  }

  CouponCode(){
    this.couponCodeBar = !this.couponCodeBar;
    if(this.couponCodeBar == true && this.TotalCost >= 500){
      this.couponValue = 100;
    } else{
      this.couponValue = 0;
    }
  }

  ShippingFees(){
    if(this.TotalCost >= 500){
      this.ShippingCharges = 150;
    } else{
      this.ShippingCharges = 0;
    }
  }

  get FinalPrice(): number{
    this.ShippingFees();
    return Math.round(this.TotalCost - this.couponValue + this.ShippingCharges);
  }


  // plus(i:number){
  //   const Values = this.TotalAddedtoCart.map((item) => {
  //     if(item.id === i){
  //       this.counter += 1;
  //     this.updateTotalPrice();
  //     }
  //   });
  // }

  plus(itemId: number): number {
    const cartItem = this.TotalAddedtoCart.find(item => item.title === itemId);
    return cartItem ? this.counter += 1 : 0;
  }

  updateTotalPrice() {
    this.totalPrice = this.counter * this.elementPrice;
  }

  SinglePrice(e:number){
    return this.elementPrice = e;
  }

  minus(itemId: number):number{
    const cartItem = this.TotalAddedtoCart.find(item => item.title === itemId);
    return cartItem ? this.counter -= 1 : 0;
  }

  removeEle(i:number){
    this.TotalAddedtoCart.splice(i, 1);
  }



}
