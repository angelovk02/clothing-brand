import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';




@Component({
  selector: 'app-t-shirts',
  templateUrl: './t-shirts.component.html',
  styleUrls: ['./t-shirts.component.css']
})
export class TShirtsComponent implements OnInit{
  tShirts: Item[] = [];


  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.apiService.findTshirts().subscribe({
      next: (items) => {
        this.tShirts = items;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }

  get isLoggedIn(): boolean{
    return this.userService.isLogged
  }

  addItemToCart(itemId: string){
    const {username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {

      }
    )
  }

}
