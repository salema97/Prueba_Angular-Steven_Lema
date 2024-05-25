import { v4 as uuid } from 'uuid';

export interface ICart {
  id: string;
  cartItems: ICartItem[];
}

export interface ICartItem {
  id: number;
  productName: string;
  picture: string;
  price: number;
  category: string;
  quantity: number;
}
export class Cart implements ICart {
  id = uuid();
  cartItems: ICartItem[] = [];
}
export interface ICartTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
