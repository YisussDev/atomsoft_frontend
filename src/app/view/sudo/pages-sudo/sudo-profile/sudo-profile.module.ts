import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoProfileRoutingModule } from './sudo-profile-routing.module';
import { SudoProfileComponent } from './sudo-profile.component';


@NgModule({
  declarations: [
    SudoProfileComponent
  ],
  imports: [
    CommonModule,
    SudoProfileRoutingModule
  ]
})
export class SudoProfileModule { }
