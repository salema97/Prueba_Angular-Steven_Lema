import { IAddress } from './Address';

export interface IOrderToCreate {
  cartId: string;
  deliveryMethodID: number;
  shipToAddress: IAddress;
}

export interface IOrder {
  orderId: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: IAddress;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  orderStatus: string;
}

export interface IOrderItem {
  productItemId: number;
  productItemName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
