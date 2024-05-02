import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { ICart } from '../../shared/Cart';
import { AccountService } from '../../account/account.service';
import { IUser } from '../../shared/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    private cartService: ShoppingCartService,
    private accountService: AccountService
  ) {}
  cart$!: Observable<ICart>;
  currentUser$!: Observable<IUser | null>;

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }
}
