import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../types/item';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: any[] = []; // Replace 'any' with your actual Item interface/type

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.apiService.getUserItems().subscribe({
      next: (items: Item[]) => {
        this.cartItems = items ;
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }


}