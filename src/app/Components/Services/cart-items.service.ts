import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from "rxjs";
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

export class cartItemsService implements OnInit, OnDestroy{

  private apiUrl = 'https://fakestoreapi.com/products/category';
  cartItems:IProduct[] = [];
  AllItems:IProduct[] = [];
  passingCartItems:IProduct[] = [];
  filterItems:IProduct[] = [];
  sidebarShow: boolean = true;
  LocalStorage:any = [];

  private productsSubject = new BehaviorSubject<IProduct[]>(this.InCreDeCreValue);
  private cartItemsSubject = new BehaviorSubject<IProduct[]>([]);


  finalPrice: number;
  ShowPayment: boolean;
  RandomAccess:any;

  constructor(
    private http: HttpClient,
    private toast:ToastService,
    ) {}

    ngOnInit(): void {
      this.LocalStorageValue;
    }

  getProductItems(params: {category: any}): Observable<IProduct[]>{
   const {category} = params;
   const url = `${this.apiUrl}/${category}`
   return this.http.get<IProduct[]>(url);
  }

  AddtoCart(item:any){
    this.AllItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(item));
    let ContentItem:any= localStorage.getItem("cartItems");
    const ItemArray:any = JSON.parse(ContentItem);
    //Filtering for duplicate Array elements
    if(this.cartItems.find((item)=> item.title === ItemArray.title) === undefined){
      this.cartItems.push(ItemArray);
      localStorage.setItem('TotalCartItems', JSON.stringify(this.cartItems));
      this.filterItems = JSON.parse(localStorage.getItem('TotalCartItems')!) || [];
      this.cartItemsSubject.next(this.getPastCartItems);
      this.toast.openSuccess(`Product : "${item?.title.length > 15 ? item?.title.substring(0,15) + "..." : item?.title}" Added to Cart Successfully`);
    } else {
      this.toast.openInfo("Product Already Added to Cart");
    }
  }

    getCartItemsObservable(): Observable<IProduct[]> {
      return this.cartItemsSubject.asObservable();
    }


    get getPastCartItems():any[]{
      this.passingCartItems = [...this.AllItems, ...this.filterItems];
        const ids = this.passingCartItems.map(({ title }:any) => title);
        const filtered = this.passingCartItems.filter(({ title }, index) =>
        !ids.includes(title, index + 1));
      console.log("Form Service to get Pass Values!", filtered);
      return filtered;
    }

    LocalStorageValue(value:any){
       this.LocalStorage = value;
       console.log(this.LocalStorage);
    }

   get InCreDeCreValue(){
      const Output = [...this.LocalStorage, ...this.getPastCartItems];
      return Output;
    }


  // getCartItems(items: any):void{
  //   this.passingCartItems = items;
  //   console.log("From Service!",this.passingCartItems);
  // }

  // get getKartItems() {
  //   return this.passingCartItems;
  // }



  IncrementCount(index: number): void {
    const updatedCartItems = [...this.InCreDeCreValue];
    if (index >= 0 && index < updatedCartItems.length) {
      const currentCount = updatedCartItems[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        updatedCartItems[index].count++;
        this.productsSubject.next(updatedCartItems);
      }
    }
  }

  DecrementCount(index: number): void {
    if (index >= 0 && index < this.InCreDeCreValue.length) {
      const currentCount = this.InCreDeCreValue[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        this.InCreDeCreValue[index].count--;
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

  IsFinalPrice():boolean{
    return this.finalPrice > 1 ? true : false;
   }

  ngOnDestroy(): void {
   this.productsSubject.unsubscribe();
  }

}
