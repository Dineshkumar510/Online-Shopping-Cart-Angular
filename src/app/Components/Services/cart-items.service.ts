import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class cartItemsService {

  private apiUrl = 'https://fakestoreapi.com/products/category';

  cartItems:any[] = [];
  sidebarShow: boolean = true;


  constructor(
    private http: HttpClient,
    ) {}

  getProductItems(params: {category: any}): Observable<any>{
   const {category} = params;
   const url = `${this.apiUrl}/${category}`
   return this.http.get(url);
  }

  AddtoCart(item:any){
    const AddCartItem:any = localStorage.setItem("cartItems", JSON.stringify(item));
    let ContentItem:any= localStorage.getItem("cartItems");
    const ItemArray = JSON.parse(ContentItem)
    this.cartItems.push(ItemArray);
    console.log(this.cartItems);
  }

  getCartItems(){
    return this.cartItems;
  }

  ShoppingCartToggle(){
    this.sidebarShow = !this.sidebarShow;
  }

}
