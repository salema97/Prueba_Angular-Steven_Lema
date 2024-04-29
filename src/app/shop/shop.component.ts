import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/product';
import { ICategories } from '../shared/Categories';
import { ShopParams } from '../shared/ShopParams';

@Component({
  selector: 'app-shops',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products!: IProduct[];
  categories!: ICategories[];
  @ViewChild('search') searchTerms!: ElementRef;
  ShopParams = new ShopParams();
  soreOptions = [
    { name: 'Nombre', value: 'Name' },
    { name: 'Precio de mayor a menor', value: 'PriceDesc' },
    { name: 'Precio de menor a mayor', value: 'PriceAsc' },
  ];

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
  }
  getProduct() {
    this.shopService.getProducts(this.ShopParams).subscribe(res => {
      this.products = res!.data;
      this.ShopParams.totalCount = res!.pageCount;
      this.ShopParams.pageNumber = res!.pageNumber;
      this.ShopParams.pageSize = res!.pageSize;
    });
  }
  getCategories() {
    this.shopService.getCategories().subscribe(res => {
      this.categories = [{ id: 0, name: 'Todas', description: '' }, ...res];
    });
  }
  onCategorySelect(categoryId: number) {
    this.ShopParams.categoryId = categoryId;

    this.getProduct();
  }
  onSortSelected(sort: Event) {
    let sortValue = (sort.target as HTMLInputElement).value;

    this.ShopParams.sorting = sortValue;

    this.getProduct();
  }
  onPageChanged(event: any) {
    if (this.ShopParams.pageNumber !== event) {
      this.ShopParams.pageNumber = event;
      this.getProduct();
    }
  }
  onSearch(SearchTerm: any) {
    this.ShopParams.search = SearchTerm;
    console.log(SearchTerm);
    this.getProduct();
  }
  onSearchInput() {
    this.ShopParams.search = this.searchTerms.nativeElement.value;
    console.log(this.ShopParams.search);
    this.getProduct();
  }
}
