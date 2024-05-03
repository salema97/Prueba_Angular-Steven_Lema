import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: ShoppingCartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // this.cart();
    // this.loadCurrentUser();
  }

  // cart() {
  //   const cartId = localStorage.getItem('cart_id');

  //   if (cartId) {
  //     this.cartService.getCart(cartId).subscribe();
  //   }
  // }

  // loadCurrentUser() {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     this.accountService.loadCurrentUser(token).subscribe;
  //   }
  // }

  title = 'Prueba Angular - Steven Lema';
}
