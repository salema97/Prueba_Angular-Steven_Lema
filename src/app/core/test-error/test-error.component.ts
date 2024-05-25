import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
})
export class TestErrorComponent {
  validationError: any;
  constructor(private http: HttpClient) {}
  basePath: string = environment.baseURL;

  get404Error() {
    this.http.get(this.basePath + 'Product/get-product-by-id/1').subscribe({
      next: (next) => console.info(next),
      error: (error) => console.error(error),
    });
  }
  get400Error() {
    this.http.get(this.basePath + 'Bug/Bad-Request').subscribe({
      next: (next) => console.info(next),
      error: (error) => console.error(error),
    });
  }
  get400validationError() {
    this.http.get(this.basePath + 'Bug/bad-request').subscribe({
      next: (next) => console.info(next),
      error: (error) => console.error(error),
    });
  }
  get500Error() {
    this.http.get(this.basePath + 'Bug/server-error').subscribe({
      next: (next) => console.info(next),
      error: (error) => (this.validationError = error.errors),
    });
  }
}
