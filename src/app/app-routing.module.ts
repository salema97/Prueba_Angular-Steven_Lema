import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Inicio' } },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'No se ha encontrado' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'Error del servidor' },
  },
  {
    path: 'test-error',
    component: TestErrorComponent,
    data: { breadcrumb: 'Error de prueba' },
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(mo => mo.ShopModule),
    data: { breadcrumb: 'Tienda' },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        mo => mo.ShoppingCartModule
      ),
    data: { breadcrumb: 'Carrito' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
