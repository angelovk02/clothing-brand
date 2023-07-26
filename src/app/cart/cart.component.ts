import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../types/item';
import * as CartActions from './cart.actions';
import { Observable } from 'rxjs';
import { map,take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
  cartItems$: Observable<Item[]>;
  private itemIdCounter = 1;

  constructor(private store: Store<{ cart: { items: Item[] } }>) {
    this.cartItems$ = store.select(state => state.cart.items);
  }

  ngOnInit() {
    // Calculate the next available item ID based on existing items in the cart
    this.cartItems$.subscribe(items => {
      if (items.length > 0) {
        this.itemIdCounter = Math.max(...items.map(item => item.id)) + 1;
      }
    });
  }

  addToCart(item: Item) {
    const newItem: Item = { ...item, id: this.generateItemId() };
    this.store.dispatch(CartActions.addToCart({ item: newItem }));
  }

  private generateItemId(): number {
    return this.itemIdCounter++;
  }

  removeFromCart(itemId: number) {
    this.store.dispatch(CartActions.removeFromCart({ itemId }));

    // Check if the cart is empty after removing an item
    this.cartItems$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) {
        this.store.dispatch(CartActions.clearCart()); // Dispatch clearCart action
      }
    });
  }

  calculateTotalPrice(cartItems$: Observable<Item[]>): Observable<number> {
    return cartItems$.pipe(
      map(items => items ? items.reduce((sum, item) => sum + item.price, 0) : 0)
    );
  }
}