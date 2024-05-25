import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartSummaryComponent } from './Components/cart-summary/cart-summary.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrderTotalsComponent, CartSummaryComponent, StepperComponent],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule,
  ],
  exports: [
    PaginationModule,
    OrderTotalsComponent,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    StepperComponent,
    CartSummaryComponent,
  ],
})
export class SharedModule {}
