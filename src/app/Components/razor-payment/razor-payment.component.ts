import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { cartItemsService } from '../Services/cart-items.service';

declare var Razorpay:any;
@Component({
  selector: 'app-razor-payment',
  templateUrl: './razor-payment.component.html',
  styleUrls: ['./razor-payment.component.scss']
})

export class RazorPaymentComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  element: any;
  finalPrice: number;
  ShowPrice: boolean;

  constructor(
    private router: Router,
    private CartService: cartItemsService,
  ) {}

  ngOnInit(): void {
    this.ShowPrice = this.CartService.IsFinalPrice();
    this.LoadValues();
  }

  LoadValues(){
    this.finalPrice = this.CartService.getFinalPrice();
  }

  PaymentMethod(){
    this.LoadValues();
    const RazorpayOptions = {
      description: 'Sample Payment Method',
      currency: 'INR',
      receipt: 'order_receipt_123',
      payment_capture: 1, // auto-capture payment
      amount: this.finalPrice * 100,
      key: 'rzp_test_cXsS8lBOEB4kZt',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
      prefill:{
        name: 'Dinesh kumar Boddepalli',
        email: 'Dk60891@gmail.com',
        phone: '9502955643'
      },
      theme: {
        color: '#35a179',
      },
      modal: {
        ondismiss:()=>{
          console.log('Modal dismissed');
        }
      }
    }

    const successCallBack = (paymentId:any) => {
      console.log(paymentId);
    }
    const failureCallback = (error:any) => {
      console.log(error);
    }

    Razorpay.open(RazorpayOptions, successCallBack, failureCallback);

    this.Redirect();
  }

  Redirect(){
    setTimeout(() => {
      this.router.navigate(['/electronics']);
    }, 5000);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
