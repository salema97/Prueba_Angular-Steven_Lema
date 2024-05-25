import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent implements OnInit {
  @Input()
  checkoutForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.SaveUserAddress();
  }

  SaveUserAddress() {
    let addressForm = this.checkoutForm.get('addressForm');
    if (addressForm) {
      let _currentAddress = addressForm.value;
      this.accountService.updateUserAddress(_currentAddress).subscribe({
        next: () => {
          this.toastr.success('Actualizado con éxito');
        },
        error: (error) => this.toastr.error(error),
      });
    }
  }

  get _firstName() {
    return this.checkoutForm.get('addressForm.firstName');
  }
  get _lastName() {
    return this.checkoutForm.get('addressForm.lastName');
  }
  get _street() {
    return this.checkoutForm.get('addressForm.street');
  }
  get _state() {
    return this.checkoutForm.get('addressForm.state');
  }
  get _city() {
    return this.checkoutForm.get('addressForm.city');
  }
  get _postalCode() {
    return this.checkoutForm.get('addressForm.postalCode');
  }
}
