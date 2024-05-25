import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  quantity: number = 1;

  constructor(
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.shopService.getProduct(parseInt(id)).subscribe((res) => {
        this.product = res;
        this.bcService.set('@ProductDetails', res.name);
      });
    }
  }
  addItemToCart() {
    this.cartService.addItemToCart(this.product, this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
