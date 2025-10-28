import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoRoutingModule } from './sudo-routing.module';
import { SudoComponent } from './sudo.component';


@NgModule({
  declarations: [
    SudoComponent
  ],
  imports: [
    CommonModule,
    SudoRoutingModule
  ]
})
export class SudoModule { }
