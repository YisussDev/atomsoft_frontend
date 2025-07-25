import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxSimpleComponent } from './components/box-simple/box-simple.component';
import { BoxImageComponent } from './components/box-image/box-image.component';



@NgModule({
  declarations: [
    BoxSimpleComponent,
    BoxImageComponent
  ],
  exports: [
    BoxSimpleComponent,
    BoxImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoxModule { }
