import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { ICartTotals } from '../../Models/Cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent implements OnInit {
  cartTotal$!: Observable<ICartTotals>;
  constructor(private cartService: ShoppingCartService) {}
  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotal$;
  }
}
