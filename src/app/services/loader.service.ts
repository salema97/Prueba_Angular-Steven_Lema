import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderRequestCount: number = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  writeUser(user: string) {
    localStorage.setItem('user', user);
  }

  load() {
    this.loaderRequestCount++;
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(215,208,208,0.8)',
      size: 'medium',
      color: '#c32d2d',
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
