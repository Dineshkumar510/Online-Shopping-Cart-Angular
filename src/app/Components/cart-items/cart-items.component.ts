import { Subscription } from 'rxjs';
import { cartItemsService } from '../Services/cart-items.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {

  cartItems:any;
  starWidth: number = 0;
  discount = Math.floor(Math.random() * 100);
  aspectdiscount = Math.floor(Math.random() * 1000);

  private routeSub: Subscription;
  elementContent: any;
  loading = false;
  elementValue: any;

  constructor(
    private cartItemsService: cartItemsService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.elementContent = params['element'];
      //this.Condition(this.elementContent);
      this.OnDataLoad();
    })
  }

  rateProduct(rateValue: number) {
    this.starWidth = rateValue * 75 / 5;
  }

// async OnDataLoad() {
//   try {
//     this.loading = true;
//     const data: any = await this.cartItemsService.getProductItems({ category: this.elementContent }).toPromise();
//     console.log(data);
//     this.cartItems = data;
//   } catch (error) {
//     console.error("Error loading data:", error);
//   } finally {
//     this.loading = false;
//   }
// }

OnDataLoad(){
  this.loading = true;
  this.cartItemsService.getProductItems({ category: this.elementContent }).subscribe(
    (response) => {
      const data = response.map(
        (item, index) => ({...item, count: 1})
      )
      console.log(data);
      this.cartItems = data;
    }
  );
  this.loading = false;
}

  addedToCart(event:any){
   this.cartItemsService.AddtoCart(event);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }

}
