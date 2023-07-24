import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
  ] ,
  exports:[FooterComponent,HeaderComponent]
})
export class CoreModule { }
