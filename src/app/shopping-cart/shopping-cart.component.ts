import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../shared/Models/Cart';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  Cart$!: Observable<ICart>;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.Cart$ = this.cartService.cart$;
  }
  incrementCartItemQuantity(item: ICartItem) {
    this.cartService.incrementCartItemQuantity(item);
  }
  decrementCartItemQuantity(item: ICartItem) {
    this.cartService.decrementCartItemQuantity(item);
  }
  removeCartItem(item: ICartItem) {
    this.cartService.removeItemFromCart(item);
  }
}
