import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartItemsComponent } from './Components/cart-items/cart-items.component';
import { cartItemsService } from './Components/cart-items.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './Components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    CartItemsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [cartItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
