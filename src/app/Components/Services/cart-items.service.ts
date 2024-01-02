import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { ToastService } from './toast.service';
import { AppComponent } from "src/app/app.component";
export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  count: number;
  rating: IRating;
}
interface IRating {
  rate: number;
  count: number;
}

@Injectable({
  providedIn: 'root',
})

export class cartItemsService implements OnDestroy{

  private apiUrl = 'https://fakestoreapi.com/products/category';
  cartItems:IProduct[] = [];
  filterItems:[] = [];
  sidebarShow: boolean = true;

  private productsSubject = new BehaviorSubject<IProduct[]>(this.cartItems);
  finalPrice: number;
  ShowPayment: boolean;

  constructor(
    private http: HttpClient,
    private toast:ToastService
    ) {}

  getProductItems(params: {category: any}): Observable<IProduct[]>{
   const {category} = params;
   const url = `${this.apiUrl}/${category}`
   return this.http.get<IProduct[]>(url);
  }

  AddtoCart(item:any){
    const AddCartItem:any = localStorage.setItem("cartItems", JSON.stringify(item));
    let ContentItem:any= localStorage.getItem("cartItems");
    const ItemArray = JSON.parse(ContentItem);

    //Filtering for duplicate Array elements
    if(this.cartItems.find((item)=> item.title === ItemArray.title) === undefined){
      this.cartItems.push(ItemArray);
      this.toast.openSuccess(`Product : "${item?.title.length > 15 ? item?.title.substring(0,15) + "..." : item?.title}" Added to Cart Successfully`);
    } else {
      this.toast.openInfo("Product Already Added to Cart");
    }
  }

  get getCartItems():IProduct[]{
    return this.cartItems;
  }

  IncrementCount(index: number): void {
    const updatedCartItems = [...this.cartItems];
    if (index >= 0 && index < updatedCartItems.length) {
      const currentCount = updatedCartItems[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        updatedCartItems[index].count++;
        this.productsSubject.next(updatedCartItems);
      } else {
        console.error("Invalid count for the product at index:", currentCount);
      }
    }
  }

  DecrementCount(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      const currentCount = this.cartItems[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        this.cartItems[index].count--;
      } else {
        console.error("Invalid count for the product at index:", currentCount);
      }
    }
  }

  setFinalPrice(price: number) {
    this.finalPrice = price;
    this.IsFinalPrice();
  }

  getFinalPrice(): number {
    return this.finalPrice;
  }

  ShoppingCartToggle(){
    this.sidebarShow = !this.sidebarShow;
  }

  IsFinalPrice(){
    return this.finalPrice > 1 ? false : true;
   }

  ngOnDestroy(): void {
   this.productsSubject.unsubscribe();
  }

}
