import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SudoHomeRoutingModule } from './sudo-home-routing.module';
import { SudoHomeComponent } from './sudo-home.component';
import {CardsModule} from "@ui/cards/cards.module";
import {TypographyModule} from "@core/directives/typography/typography.module";


@NgModule({
  declarations: [
    SudoHomeComponent
  ],
  imports: [
    CommonModule,
    SudoHomeRoutingModule,
    CardsModule,
    TypographyModule
  ]
})
export class SudoHomeModule { }
