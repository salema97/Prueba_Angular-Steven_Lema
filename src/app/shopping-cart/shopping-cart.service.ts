import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';
import { Cart, ICart, ICartItem, ICartTotals } from '../shared/Cart';
import { IProduct } from '../shared/Product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  writeUser(user: string) {
    localStorage.setItem('user', user);
  }

  baseURL: string = environment.baseURL;
  private cartSource = new BehaviorSubject<ICart>(null as any);
  cart$ = this.cartSource.asObservable();

  incrementCartItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const itemIndex = cart.cartItems.findIndex(x => x.id === item.id);
    cart.cartItems[itemIndex].quantity++;
    this.setCart(cart);
  }

  decrementCartItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const itemIndex = cart.cartItems.findIndex(x => x.id === item.id);
    if (cart.cartItems[itemIndex].quantity > 1) {
      cart.cartItems[itemIndex].quantity--;
      this.setCart(cart);
    } else {
      this.removeItemFromCart(item);
    }
  }
  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    if (cart.cartItems.some(x => x.id === item.id)) {
      cart.cartItems = cart.cartItems.filter(x => x.id !== item.id);
      if (cart.cartItems.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }
  deleteLocalCart(id: string) {
    this.cartSource.next(null as any);
    this.cartTotalSource.next(null as any);
    localStorage.removeItem('cart_id');
  }
  deleteCart(cart: ICart) {
    return this.http
      .delete(this.baseURL + 'Cart/delete-cart-item/' + cart.id)
      .subscribe({
        next: () => {
          this.cartSource.next(null as any);
          this.cartTotalSource.next(null as any);
          localStorage.removeItem('cart_id');
        },
        error: err => {
          console.log(err);
        },
      });
  }

  private cartTotalSource = new BehaviorSubject<ICartTotals>(null as any);
  cartTotal$ = this.cartTotalSource.asObservable();
  private calculateTotal() {
    const cart = this.getCurrentCartValue();
    const shipping = 0;
    const subtotal = cart.cartItems.reduce((a, c) => {
      return c.price * c.quantity + a;
    }, 0);
    const total = shipping + subtotal;
    this.cartTotalSource.next({ shipping, subtotal, total });
  }

  constructor(private http: HttpClient) {}

  getCart(id: string) {
    return this.http.get<ICart>(this.baseURL + 'Cart/get-cart-item/' + id).pipe(
      map((cart: ICart) => {
        this.cartSource.next(cart);
        this.calculateTotal();
      })
    );
  }

  setCart(cart: ICart) {
    return this.http
      .post<ICart>(this.baseURL + 'Cart/update-cart/', cart)
      .subscribe({
        next: (res: ICart) => {
          this.cartSource.next(res);
          this.calculateTotal();
          //console.log(res);
        },
        error: err => {
          console.log(err);
        },
      });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: IProduct, quantity: number = 1) {
    const ItemToAdd: ICartItem = this.MapProductItemToCartItem(item, quantity);
    const cart = this.getCurrentCartValue() ?? this.CreateCart();
    cart.cartItems = this.AddOrUpdate(cart.cartItems, ItemToAdd, quantity);
    return this.setCart(cart);
  }
  private AddOrUpdate(
    cartItems: ICartItem[],
    ItemToAdd: ICartItem,
    quantity: number
  ): ICartItem[] {
    const index = cartItems.findIndex(i => i.id === ItemToAdd.id);
    if (index === -1) {
      ItemToAdd.quantity = quantity;
      cartItems.push(ItemToAdd);
    } else {
      cartItems[index].quantity += quantity;
    }
    return cartItems;
  }

  private CreateCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private MapProductItemToCartItem(
    item: IProduct,
    quantity: number
  ): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      picture: item.picture,
      category: item.categoryName,
      quantity,
    };
  }
}
