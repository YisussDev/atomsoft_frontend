import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoApplicationsRoutingModule } from './sudo-applications-routing.module';
import { SudoApplicationsComponent } from './sudo-applications.component';


@NgModule({
  declarations: [
    SudoApplicationsComponent
  ],
  imports: [
    CommonModule,
    SudoApplicationsRoutingModule
  ]
})
export class SudoApplicationsModule { }
