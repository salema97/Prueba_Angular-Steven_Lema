import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/Models/DeliveryMethods';
import { IOrderToCreate } from '../shared/Models/Order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  _baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}
  getDeliveryMethods() {
    return this.http
      .get<IDeliveryMethod[]>(this._baseURL + 'Order/get-delivery-method')
      .pipe(
        map((res: IDeliveryMethod[]) => {
          return res.sort((a, b) => b.price - a.price);
        })
      );
  }
  createOrder(order: IOrderToCreate) {
    return this.http.post(this._baseURL + 'Order/create-order', order);
  }
}
