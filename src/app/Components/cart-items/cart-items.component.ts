import { Subscription } from 'rxjs';
import { cartItemsService } from './../cart-items.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {

  @Output() sidebarShow = new EventEmitter<boolean>();
  cartItems:any;
  discount = Math.floor(Math.random() * 100);
  aspectdiscount = Math.floor(Math.random() * 1000);

  private routeSub: Subscription;
  elementContent: any;
  elementValue: any;
  AddedcartItems: [] = [];

  constructor(
    private cartItemsService: cartItemsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.elementContent = params['element'];
      this.Condition(this.elementContent);
      this.OnDataLoad();
    })
    console.log("discount Label: ", this.aspectdiscount)
    console.log(this.sidebarShow.emit());
  }

  Condition(elements: any) {
    if (elements === "products") {
      this.elementValue = 0;
    }else if (elements === "Clothes") {
      this.elementValue = 1;
    } else if (elements === "Electronics") {
      this.elementValue = 2;
    } else if (elements === "Audi") {
      this.elementValue = 3;
    } else if (elements === "Shoes") {
      this.elementValue = 4;
    } else if (elements === "Miscellaneous") {
      this.elementValue = 5;
    } else {
      this.elementValue = null;
    }
    return this.elementValue;
}

  OnDataLoad(){
    this.cartItemsService.getProductItems({Count: this.elementValue}).subscribe(
      (data:any) => {
        console.log(data);
        this.cartItems = data;
      }
    )
  }

  addedToCart(event:any){
    const AddCartItem = localStorage.setItem("cartItems", JSON.stringify(event));
    //this.AddedcartItems.push(AddCartItem);
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
