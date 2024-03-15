import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoredataService {

  constructor(private http: HttpClient) { }

  fireBaseKey = 'https://angular---online-shopping-kart-default-rtdb.asia-southeast1.firebasedatabase.app/data.json'

  StoreData(){
    const TotalCartItems = JSON.parse(localStorage.getItem('TotalCartItems')|| '{}');
    const IncStack  = JSON.parse(localStorage.getItem('IncStack')|| '{}');
    if(IncStack.length == 0){
      this.http.put(this.fireBaseKey, TotalCartItems)
    } else {
      this.http.put(this.fireBaseKey, IncStack);
    }
  }

  fetchData():Observable<any>{
    const url = this.fireBaseKey
    return this.http.get(url);
  }

  DeleteData(id:any){
    this.http.delete(this.fireBaseKey, id)
  }
}
