import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { ShopComponent } from './shop/shop.component';
import { ItemsModule } from './items/items.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticationComponent } from './authentication/authentication.component';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart/cart.component';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    AuthenticationComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    ItemsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [appInterceptorProvider,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
