import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStoreBuyRoutingModule } from './page-store-buy-routing.module';
import { PageStoreBuyComponent } from './page-store-buy.component';


@NgModule({
  declarations: [
    PageStoreBuyComponent
  ],
  imports: [
    CommonModule,
    PageStoreBuyRoutingModule
  ]
})
export class PageStoreBuyModule { }
