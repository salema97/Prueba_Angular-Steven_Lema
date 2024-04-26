import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private cartService: ShoppingCartService) {}
  ngOnInit(): void {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      this.cartService.getCart(cartId).subscribe({
        next: () => {
          console.log('initialCart');
        },
        error: err => {
          console.error(err);
        },
      });
    }
  }
  title = 'Prueba Angular - Steven Lema';
}
