import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      countDuplicates: true,
      preventDuplicates: false,
    }),
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
  ],
  exports: [NavbarComponent, FooterComponent, SectionHeaderComponent],
})
export class CoreModule {}
