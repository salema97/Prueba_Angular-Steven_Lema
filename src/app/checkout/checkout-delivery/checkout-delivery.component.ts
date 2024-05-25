import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { IDeliveryMethod } from '../../shared/Models/DeliveryMethods';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input()
  checkoutForm!: FormGroup;
  deliveryMethods!: IDeliveryMethod[];

  constructor(
    private checkoutService: CheckoutService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (res: IDeliveryMethod[]) => {
        this.deliveryMethods = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.cartService.setShippingPrice(deliveryMethod);
  }
}
