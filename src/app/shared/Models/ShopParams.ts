export class ShopParams {
  categoryId: number = 0;
  sorting: string = 'name';
  pageNumber: number = 1;
  pageSize: number = 8;
  totalCount!: number;
  search!: string;
}
