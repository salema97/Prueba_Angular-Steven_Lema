import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [{ path: '', component: ShoppingCartComponent }];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
