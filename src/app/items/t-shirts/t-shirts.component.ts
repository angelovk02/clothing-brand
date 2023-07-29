import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-t-shirts',
  templateUrl: './t-shirts.component.html',
  styleUrls: ['./t-shirts.component.css']
})
export class TShirtsComponent implements OnInit{
  tShirts: Item[] = [];
  isEditMode: boolean = false;
  editedItem: Item | null = null;
  editForm!: FormGroup;
  originalItem: Item | undefined;


  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

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

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  get isAdmin(): boolean {
    return this.userService.user!.username === 'admin'
  }

  addItemToCart(itemId: string){
    const {username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {

      }
    )
  }

  editItem(item: Item) {
    this.editedItem = item;
    this.editForm.patchValue({
      name: item.name,
      price: item.price

    });
    this.isEditMode = true;
  }

  saveItem() {
    if (this.editForm.valid && this.editedItem) {

      const updatedItem: Item = {
        ...this.editedItem,
        name: this.editForm.value.name,
        price: this.editForm.value.price
      };

      this.apiService.updateItem(updatedItem).subscribe(() => {
        console.log('item updated');
        this.isEditMode = false;
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;

  }

  deleteItem(itemId: string) {
    this.apiService.deleteItem(itemId).subscribe({
      next: () => {
        this.tShirts = this.tShirts.filter((item) => item.id !== itemId);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }
}
