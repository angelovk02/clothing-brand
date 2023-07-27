
import { Component,OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-pants',
  templateUrl: './pants.component.html',
  styleUrls: ['./pants.component.css']
})
export class PantsComponent implements OnInit{
  pants: Item[] = [];


  constructor(
    private apiService: ApiService,
    private userService: UserService
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

  addItemToCart(itemId: string){
    const {username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {
        console.log('item ')
      }
    )
  }


 
}
