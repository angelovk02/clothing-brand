import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../shop/shop.component';
import { ItemsRoutingModule } from './items-routing.module';
import { PantsComponent } from './pants/pants.component';
import { HoodiesComponent } from './hoodies/hoodies.component';
import { TShirtsComponent } from './t-shirts/t-shirts.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";




@NgModule({
  declarations: [
    PantsComponent,
    HoodiesComponent,
    TShirtsComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,  
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ItemsModule { }
