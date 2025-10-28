import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoHomeRoutingModule } from './sudo-home-routing.module';
import { SudoHomeComponent } from './sudo-home.component';


@NgModule({
  declarations: [
    SudoHomeComponent
  ],
  imports: [
    CommonModule,
    SudoHomeRoutingModule
  ]
})
export class SudoHomeModule { }
