import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent, CarouselSlideDirective} from './carousel/carousel.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CarouselComponent,
    CarouselSlideDirective
  ],
  exports: [
    CarouselComponent,
    CarouselSlideDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CarouselModule { }
