import { createAction, props } from '@ngrx/store';
import { Item } from '../types/item';

export const addToCart = createAction('[Cart] Add To Cart', props<{ item: Item }>());
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ itemId: number }>());
export const clearCart = createAction('[Cart] Clear Cart');