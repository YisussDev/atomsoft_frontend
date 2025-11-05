import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageHomeRoutingModule} from './page-home-routing.module';
import {PageHomeComponent} from './page-home.component';
import {BoxModule} from "@ui/box/box.module";
import {HomeBannersLastComponent} from './home-banners-last/home-banners-last.component';
import {IconsModule} from "@ui/icons/icons.module";
import {ChipModule} from "@ui/chip/chip.module";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {CarouselModule} from "@ui/carousel/carousel.module";
import {CardApplicationCarouselModule} from "@ui/cards/card-application-carousel/card-application-carousel.module";


@NgModule({
  declarations: [
    PageHomeComponent,
    HomeBannersLastComponent
  ],
  imports: [
    CommonModule,
    PageHomeRoutingModule,
    BoxModule,
    IconsModule,
    ChipModule,
    ButtonsModule,
    CarouselModule,
    CardApplicationCarouselModule
  ]
})
export class PageHomeModule {
}
