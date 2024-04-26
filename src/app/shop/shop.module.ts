import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { BreadcrumbComponent } from 'xng-breadcrumb';

@NgModule({
  declarations: [ShopComponent, ShopItemComponent, ProductDetailsComponent],
  imports: [CommonModule, SharedModule, ShopRoutingModule, BreadcrumbComponent],
  exports: [],
})
export class ShopModule {}
