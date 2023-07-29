import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from './types/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addItem(id:string, name:String,image:String,category:String,price:String) {
    return this.http.post<Item>('/api/items', { id, name, image, category, price });
  }

  addToCart(userEmail: string, itemId: string) {
    const payload = { userEmail, itemId };
    return this.http.post<any>(`/api/items/cart`, payload);
  }
  getUserItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/items/cart');
  }

  findHoodies() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/items/hoodies`);
  }

  findPants() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/items/pants`);
  }

  findTshirts() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/items/t-shirts`);
  }

  removeItemFromCart(itemId: string): Observable<any> {
    return this.http.delete(`/api/items/cart/${itemId}`);
  }

  placeOrder(city: string, address: string): Observable<any> {
    const orderData = { city, address };

    return this.http.put<any>(`/api/items/cart/placeOrder`, orderData)
  }


  updateItem(item: Item): Observable<Item> {
    const url = `/api/items/${item.id}`;
    return this.http.put<Item>(url, item);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`/api/items/${itemId}`);
  }
}
