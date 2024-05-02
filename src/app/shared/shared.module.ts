import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderTotalsComponent],
  imports: [CommonModule, PaginationModule, FormsModule, ReactiveFormsModule],
  exports: [
    PaginationModule,
    OrderTotalsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
