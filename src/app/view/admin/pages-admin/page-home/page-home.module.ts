import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHomeRoutingModule } from './page-home-routing.module';
import { PageHomeComponent } from './page-home.component';
import {BoxModule} from "@ui/box/box.module";


@NgModule({
  declarations: [
    PageHomeComponent
  ],
    imports: [
        CommonModule,
        PageHomeRoutingModule,
        BoxModule
    ]
})
export class PageHomeModule { }
