import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          if (error.status == 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toast.error(error.error.massage, error.error.statusCode);
            }
          }
          if (error.status === 401) {
            this.toast.error(error.error.massage, error.error.statusCode);
          }
          if (error.status === 404) {
            //
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            const navigationExtra: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigationExtra);
          }
        }
        return throwError(() => error.message || '¡Servidor no encontrado!');
      })
    );
  }
}
