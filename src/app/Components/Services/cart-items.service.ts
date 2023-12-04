import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class cartItemsService {

  private apiUrl = 'https://fakestoreapi.com/products/category';

  AddedcartItems:any[] = [];


  constructor(
    private http: HttpClient,
    ) {}

  getProductItems(params: {category: any}): Observable<any>{
   const {category} = params;
   const url = `${this.apiUrl}/${category}`
   return this.http.get(url);
  }

  AddtoCart(items:any){
    const AddCartItem:any = localStorage.setItem("cartItems", JSON.stringify(items));
    let ContentItem:any= localStorage.getItem("cartItems");
    const ItemArray = JSON.parse(ContentItem)
    this.AddedcartItems.push(ItemArray);
    console.log(this.AddedcartItems);
  }

  getCartItems(){
    return this.AddedcartItems;
  }

}
