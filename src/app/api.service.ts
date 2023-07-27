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
    return this.http.post<Item>('/api/themes', { id, name, image, category, price });
  }

  addToCart(userEmail: string, itemId: string) {
    const payload = { userEmail, itemId };
    return this.http.post<any>(`/api/themes/cart`, payload);
  }
  getUserItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/themes/cart');
  }

  findHoodies() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/themes/hoodies`);
  }

  findPants() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/themes/pants`);
  }

  findTshirts() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/themes/t-shirts`);
  }

}
