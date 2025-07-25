import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverRoutingModule } from './recover-routing.module';
import { RecoverComponent } from './recover.component';


@NgModule({
  declarations: [
    RecoverComponent
  ],
  imports: [
    CommonModule,
    RecoverRoutingModule
  ]
})
export class RecoverModule { }
