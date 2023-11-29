import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})

export class cartItemsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) {}

  getProductItems(params: {Count: Number}): Observable<any>{
   const {Count} = params;
   const url = `${this.apiUrl}/products/?categoryId=${Count}`
   return this.http.get(url);
  }

}
