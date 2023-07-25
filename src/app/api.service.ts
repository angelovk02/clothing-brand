import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from './types/item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addItem(name:String,image:String,category:String,price:String) {
    return this.http.post<Item>('/api/themes', { name, image, category, price });
  }

  findHoodies() {
    const { apiUrl } = environment;
    return this.http.get<Item[]>(`${apiUrl}/themes`);
  }

}
