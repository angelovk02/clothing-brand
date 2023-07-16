import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';
import { PantsComponent } from './pants/pants.component';
import { HoodiesComponent } from './hoodies/hoodies.component';
import { TShirtsComponent } from './t-shirts/t-shirts.component';

const routes: Routes = [
    {
        path: 'shop', component: ShopComponent,
        children: [
            { path: 'pants', component: PantsComponent },
            { path: 'hoodies', component: HoodiesComponent },
            { path: 't-shirts', component: TShirtsComponent },
        ],
    }
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemsRoutingModule { }
