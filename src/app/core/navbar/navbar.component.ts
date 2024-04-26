import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { ICart } from '../../shared/Cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private cartService: ShoppingCartService) {}
  cart$!: Observable<ICart>;

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
  }
}
