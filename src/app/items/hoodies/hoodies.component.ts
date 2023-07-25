import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';


@Component({
  selector: 'app-hoodies',
  templateUrl: './hoodies.component.html',
  styleUrls: ['./hoodies.component.css']
})


export class HoodiesComponent implements OnInit{
  hoodiess: Item[] = [];


  constructor(
    private apiService: ApiService,
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
}
