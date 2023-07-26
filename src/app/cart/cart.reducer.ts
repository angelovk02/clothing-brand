import { createReducer, on } from '@ngrx/store';
import { Item } from '../types/item';

import * as CartActions from './cart.actions';

export interface CartState {
    items: Item[];
  }
  
  export const initialCartState: CartState = {
    items: []
  };
  

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { item }) => ({ ...state, items: [...state.items, item] })),
  on(CartActions.removeFromCart, (state, { itemId }) => ({ ...state, items: state.items.filter(item => item.id !== itemId) })),
);