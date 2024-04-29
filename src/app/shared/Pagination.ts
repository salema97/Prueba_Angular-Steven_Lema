import { IProduct } from './Product';

export interface IPagination {
  pageSize: number;
  pageNumber: number;
  pageCount: number;
  data: IProduct[];
}
