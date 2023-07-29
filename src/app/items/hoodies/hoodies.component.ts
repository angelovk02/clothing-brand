import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-hoodies',
  templateUrl: './hoodies.component.html',
  styleUrls: ['./hoodies.component.css']
})


export class HoodiesComponent implements OnInit{
  hoodiess: Item[] = [];
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
    this.apiService.findHoodies().subscribe({
      next: (items) => {
        this.hoodiess = items;

      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }

  get isLoggedIn(): boolean{
    return this.userService.isLogged
  }

  get isAdmin(): boolean {
    return this.userService.user!.username === 'admin'
  }

  addItemToCart(itemId: string){
    const {username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {}
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
        this.hoodiess = this.hoodiess.filter((item) => item.id !== itemId);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }


}
