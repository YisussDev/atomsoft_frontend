import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container/card-container.component';
import {IconsModule} from "@ui/icons/icons.module";
import {TypographyModule} from "@core/directives/typography/typography.module";



@NgModule({
  declarations: [
    CardContainerComponent
  ],
  exports: [
    CardContainerComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    TypographyModule
  ]
})
export class CardsModule { }
