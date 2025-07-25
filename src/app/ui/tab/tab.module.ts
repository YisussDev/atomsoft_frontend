import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavigationSquareComponent } from './tab-navigation-square/tab-navigation-square.component';
import {IconsModule} from "../icons/icons.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { TabNavigationHorizontalComponent } from './tab-navigation-horizontal/tab-navigation-horizontal.component';



@NgModule({
    declarations: [
        TabNavigationSquareComponent,
        TabNavigationHorizontalComponent
    ],
  exports: [
    TabNavigationSquareComponent,
    TabNavigationHorizontalComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class TabModule { }
