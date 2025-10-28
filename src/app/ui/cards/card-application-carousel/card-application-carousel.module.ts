import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardApplicationCarouselComponent } from './card-application-carousel.component';
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {ChipModule} from "@ui/chip/chip.module";
import {IconsModule} from "@ui/icons/icons.module";



@NgModule({
  declarations: [
    CardApplicationCarouselComponent
  ],
  exports: [
    CardApplicationCarouselComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    ChipModule,
    IconsModule
  ]
})
export class CardApplicationCarouselModule { }
