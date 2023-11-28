import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})

export class cartItemsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) {}

  getProductItems(params: {types:string, Count: Number}): Observable<any>{
   const {types, Count} = params;
   const url = `${this.apiUrl}/${types}/?categoryId=${Count}`
   return this.http.get(url);
  }

}
