import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/product';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shops-item',
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss',
})
export class ShopItemComponent {
  soreOptions: any;
  constructor(private cartService: ShoppingCartService) {}
  addItemToCart() {
    this.cartService.addItemToCart(this.products);
  }
  @Input() products!: IProduct;
}
