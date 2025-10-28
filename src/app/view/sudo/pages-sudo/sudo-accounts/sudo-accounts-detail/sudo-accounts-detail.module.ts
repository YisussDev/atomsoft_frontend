import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoAccountsDetailRoutingModule } from './sudo-accounts-detail-routing.module';
import { SudoAccountsDetailComponent } from './sudo-accounts-detail.component';


@NgModule({
  declarations: [
    SudoAccountsDetailComponent
  ],
  imports: [
    CommonModule,
    SudoAccountsDetailRoutingModule
  ]
})
export class SudoAccountsDetailModule { }
