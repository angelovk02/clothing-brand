
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-pants',
  templateUrl: './pants.component.html',
  styleUrls: ['./pants.component.css']
})
export class PantsComponent implements OnInit {
  pants: Item[] = [];
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
    this.apiService.findPants().subscribe({
      next: (items) => {
        this.pants = items;

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

  addItemToCart(itemId: string) {
    const { username, email, tel } = this.userService.user!


    this.apiService.addToCart(email, itemId).subscribe(() => {
      console.log('item ')
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
        this.pants = this.pants.filter((item) => item.id !== itemId);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }


}
