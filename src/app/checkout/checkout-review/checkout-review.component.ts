import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  @Input()
  appStepper!: CdkStepper;

  constructor(
    private cartService: ShoppingCartService,
    private toast: ToastrService
  ) {}
}
