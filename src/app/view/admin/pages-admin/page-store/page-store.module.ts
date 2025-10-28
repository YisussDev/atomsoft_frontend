import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStoreRoutingModule } from './page-store-routing.module';
import { PageStoreComponent } from './page-store.component';


@NgModule({
  declarations: [
    PageStoreComponent
  ],
  imports: [
    CommonModule,
    PageStoreRoutingModule
  ]
})
export class PageStoreModule { }
