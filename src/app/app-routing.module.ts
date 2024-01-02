import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartItemsComponent} from './Components/cart-items/cart-items.component'
import {RazorPaymentComponent} from './Components/razor-payment/razor-payment.component';

const routes: Routes = [
  {path:'', redirectTo: '/electronics', pathMatch: 'full'},
  {path:':element', component: CartItemsComponent},
  {path:'Payment', component:RazorPaymentComponent}
  //{path:'payment-page', loadChildren: () => import('./Components/razor-payment/razor-payment.module').then(m => m.RazorPaymentRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
