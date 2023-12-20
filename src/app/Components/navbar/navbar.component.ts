import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemsService } from '../Services/cart-items.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() sidebarShow: boolean = true;
  @ViewChild("priceTag") priceTag: ElementRef;

  counter = 1;
  TotalAddedtoCart:any[] = [];
  finalCart:any[] = [];
  elementPrice:any;
  totalPrice:any;

  constructor(
    private router: Router,
    private cartItemsService: cartItemsService,
  ) { }

  ngOnInit(): void {
    this.OnCardItem();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.OnCardItem();
  }

  OnCardItem(){
    this.TotalAddedtoCart = this.cartItemsService.getCartItems();
    const uniqueSet = new Set(this.TotalAddedtoCart);
    // Convert the Set back to an array
    const uniqueArray = Array.from(uniqueSet);
    this.finalCart = uniqueArray;
   }


  ShowHide(event:any){
    if(event){
      event.stopPropagation();
      this.sidebarShow = !this.sidebarShow;
    }
  }

  plus(i:number){
    const Values = this.TotalAddedtoCart.map((item) => {
      if(item.id === i){
        this.counter += 1;
      this.updateTotalPrice();
      }
    });
  }

  updateTotalPrice() {
    this.totalPrice = this.counter * this.elementPrice;
  }

  SinglePrice(e:number){
    return this.elementPrice = e;
  }

  minus(i:number){
    const Values = this.TotalAddedtoCart.map((item) => {
      if(item.id === i){
        this.counter -= 1;
      this.updateTotalPrice();
      }
    });
  }

  removeEle(i:number){
    this.TotalAddedtoCart.splice(i, 1);
  }



}
