import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../../Models/Cart';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  Cart$!: Observable<ICart>;
  @Output() decrement: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() increment: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() remove: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Input() isCart: boolean = true;

  constructor(private cartServices: ShoppingCartService) {}

  ngOnInit(): void {
    this.Cart$ = this.cartServices.cart$;
  }

  decrementCartItemQuantity(item: ICartItem) {
    this.decrement.emit(item);
  }
  incrementCartItemQuantity(item: ICartItem) {
    this.increment.emit(item);
  }
  removeItemFromCart(item: ICartItem) {
    this.remove.emit(item);
  }
}
