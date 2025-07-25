import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarLoadComponent } from './bar-load.component';



@NgModule({
  declarations: [
    BarLoadComponent
  ],
  exports: [
    BarLoadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BarLoadModule { }
