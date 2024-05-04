import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderRequestCount: number = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  load() {
    this.loaderRequestCount++;
    this.spinnerService.show(undefined, {
      bdColor: 'rgb(136, 136, 136, 0.5)',
      size: 'large',
      color: '#fe4c50',
      type: 'ball-atom',
    });
  }
  hidingLoader() {
    this.loaderRequestCount--;
    if (this.loaderRequestCount <= 0) {
      this.loaderRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
