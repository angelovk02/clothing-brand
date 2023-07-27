import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-hoodies',
  templateUrl: './hoodies.component.html',
  styleUrls: ['./hoodies.component.css']
})


export class HoodiesComponent implements OnInit{
  hoodiess: Item[] = [];


  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.apiService.findHoodies().subscribe({
      next: (items) => {
        this.hoodiess = items;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }

  addItemToCart(itemId: string){
    const {username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {}
    )
  }


}
