import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbGenericComponent} from './breadcrumb-generic.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    BreadcrumbGenericComponent
  ],
  exports: [
    BreadcrumbGenericComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class BreadcrumbGenericModule {
}
