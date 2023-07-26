
import { Component,OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { Store } from '@ngrx/store';
import * as CartActions from '../../cart/cart.actions';


@Component({
  selector: 'app-pants',
  templateUrl: './pants.component.html',
  styleUrls: ['./pants.component.css']
})
export class PantsComponent implements OnInit{
  pants: Item[] = [];


  constructor(
    private apiService: ApiService,
    private store: Store<{ cart: Item[] }>
  ) {}

  ngOnInit(): void {
    this.apiService.findPants().subscribe({
      next: (items) => {
        this.pants = items;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }

  addToCart(item: Item) {
    this.store.dispatch(CartActions.addToCart({ item }));
  }
 
}
