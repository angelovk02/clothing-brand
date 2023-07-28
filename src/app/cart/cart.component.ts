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
  totalCost = 0
  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.apiService.getUserItems().subscribe({
      next: (items: Item[]) => {
        this.cartItems = items;
        this.calculateTotalPrice()
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  removeFromCart(itemId: string): void {
    this.apiService.removeItemFromCart(itemId).subscribe({
      next: () => {
        // Item removed successfully, update the cart items
        this.apiService.getUserItems().subscribe({
          next: (items: Item[]) => {
            this.cartItems = items;
            this.calculateTotalPrice()
          },
          error: (error) => {
            console.error('Error fetching cart items:', error);
          }
        })
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
        // Handle any error here (e.g., show an error message)
      }
    });
  }

  calculateTotalPrice() {
    if (this.cartItems) {
      this.totalCost = this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    }
  }
}