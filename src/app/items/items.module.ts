import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../shop/shop.component';
import { ItemsRoutingModule } from './items-routing.module';
import { PantsComponent } from './pants/pants.component';
import { HoodiesComponent } from './hoodies/hoodies.component';
import { TShirtsComponent } from './t-shirts/t-shirts.component';



@NgModule({
  declarations: [
    PantsComponent,
    HoodiesComponent,
    TShirtsComponent
  ],
  imports: [
    CommonModule,ItemsRoutingModule
  ]
})
export class ItemsModule { }
