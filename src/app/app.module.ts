import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    // ShopsModule,
    SharedModule,
    PaginationModule,
    HomeModule,
    BrowserAnimationsModule,
    BreadcrumbComponent,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
