import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../types/item';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDeliveryInfo } from '../types/user-delivery-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: any[] = []; // Replace 'any' with your actual Item interface/type
  totalCost = 0
  deliveryInfo: UserDeliveryInfo = { city: '', address: '' };

  constructor(private apiService: ApiService, private fb: FormBuilder,private router: Router) { }

  form = this.fb.group({
    city: ['', [Validators.required, Validators.minLength(3)]],

    address: ['', [Validators.required, Validators.minLength(5)]],

  })

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
      }
    });
  }

  calculateTotalPrice() {
    if (this.cartItems) {
      this.totalCost = this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    }
  }

  placeOrder(): void {
    if (this.form.invalid) {
      return;
    }


    const city = this.form.value.city;
    const address = this.form.value.address;


    this.apiService.placeOrder(city!, address!).subscribe({
      next: (response) => {
        this.router.navigate(['/shop']);
        alert('Your order was placed successfully!')
        console.log('Order placed successfully!', response);
      },
      error: (error) => {

        console.error('Error placing the order:', error);
      }
    });
  }

}