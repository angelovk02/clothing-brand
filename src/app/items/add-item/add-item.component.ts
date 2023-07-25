import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required]],
  })

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder){}


  addItem() : void {
    if(this.form.invalid){
      return
    }

    const {
      name,
      image,
      category,
      price,
    } = this.form.value;

    this.apiService.addItem(name!, image!,category!,price!).subscribe(() => {
      this.router.navigate(['/shop']);
    });
  }
}
