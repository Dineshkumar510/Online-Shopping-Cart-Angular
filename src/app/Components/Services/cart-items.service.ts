import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {ToastService} from '../Services/toast.service';

@Injectable({
  providedIn: 'root',
})

export class cartItemsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1';

  AddedcartItems:any[] = [];


  constructor(
    private http: HttpClient,
    private toast: ToastService,
    ) {}

  getProductItems(params: {Count: Number}): Observable<any>{
   const {Count} = params;
   const url = `${this.apiUrl}/products/?categoryId=${Count}`
   return this.http.get(url);
  }

  AddtoCart(items:any){
    this.toast.openSuccess("Product added to cart");
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
