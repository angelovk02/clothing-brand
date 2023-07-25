import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';



@Component({
  selector: 'app-t-shirts',
  templateUrl: './t-shirts.component.html',
  styleUrls: ['./t-shirts.component.css']
})
export class TShirtsComponent implements OnInit{
  tShirts: Item[] = [];


  constructor(
    private apiService: ApiService,
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
}
