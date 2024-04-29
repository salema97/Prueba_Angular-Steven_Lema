import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Product';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shops-item',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent {
  soreOptions: any;
  constructor(private cartService: ShoppingCartService) {}
  addItemToCart() {
    this.cartService.addItemToCart(this.products);
  }
  @Input() products!: IProduct;
}