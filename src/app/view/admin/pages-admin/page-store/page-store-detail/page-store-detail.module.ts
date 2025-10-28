import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStoreDetailRoutingModule } from './page-store-detail-routing.module';
import { PageStoreDetailComponent } from './page-store-detail.component';


@NgModule({
  declarations: [
    PageStoreDetailComponent
  ],
  imports: [
    CommonModule,
    PageStoreDetailRoutingModule
  ]
})
export class PageStoreDetailModule { }
