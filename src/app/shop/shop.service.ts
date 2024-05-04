import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Pagination';
import { ICategories } from '../shared/Categories';
import { response } from 'express';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/ShopParams';
import { IProduct } from '../shared/product';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.categoryId != 0) {
      params = params.append('CategoryId', shopParams.categoryId.toString());
    }

    params = params.append('Sorting', shopParams.sorting.toString());
    params = params.append('PageNumber', shopParams.pageNumber.toString());
    params = params.append('Pagesize', shopParams.pageSize.toString());
    if (shopParams.search) {
      params = params.append('Search', shopParams.search);
    }
    return this.http
      .get<IPagination>(this.baseURL + 'Product/get-all-products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
  getCategories() {
    return this.http.get<ICategories[]>(
      this.baseURL + 'Category/get-all-categories'
    );
  }
  getProduct(id: number) {
    return this.http.get<IProduct>(
      this.baseURL + 'Product/get-product-by-id/' + id
    );
  }
}
