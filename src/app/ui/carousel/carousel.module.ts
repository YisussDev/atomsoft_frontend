import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CarouselComponent
  ],
  exports: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CarouselModule { }
