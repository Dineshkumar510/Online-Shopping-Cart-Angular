import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartItemsComponent } from './Components/cart-items/cart-items.component';
import { cartItemsService } from './Components/Services/cart-items.service';
import {NgToastModule} from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { loaderComponent } from './Components/loader/loader.component';
import { RazorPaymentComponent } from './Components/razor-payment/razor-payment.component';
import { WindowRef } from 'src/app/Components/razor-payment/WindowRef';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    loaderComponent,
    AppComponent,
    CartItemsComponent,
    NavbarComponent,
    RazorPaymentComponent,
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [cartItemsService, WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
