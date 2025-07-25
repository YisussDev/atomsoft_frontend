import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageProfileRoutingModule } from './page-profile-routing.module';
import { PageProfileComponent } from './page-profile.component';


@NgModule({
  declarations: [
    PageProfileComponent
  ],
  imports: [
    CommonModule,
    PageProfileRoutingModule
  ]
})
export class PageProfileModule { }
