import { Component, Input } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { ICart } from '../../shared/Models/Cart';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  @Input()
  checkoutForm!: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}

  submitOrder() {
    const cart = this.cartService.getCurrentCartValue();
    const orderToCreates = this.getOrderToCreate(cart);
    this.checkoutService.createOrder(orderToCreates).subscribe({
      next: () => {
        this.toastr.success('Pedido enviado correctamente');
        this.cartService.deleteLocalCart(cart.id);
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }

  private getOrderToCreate(cart: ICart) {
    let deliveryMethod = this.checkoutForm.get('deliveryForm.deliveryMethod');
    let addressForm = this.checkoutForm.get('addressForm');

    return {
      cartId: cart.id,
      deliveryMethodID: deliveryMethod ? deliveryMethod.value : null,
      shipToAddress: addressForm ? addressForm.value : null,
    };
  }
}
