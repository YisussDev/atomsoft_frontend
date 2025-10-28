import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavigationSquareComponent } from './tab-navigation-square/tab-navigation-square.component';
import {IconsModule} from "../icons/icons.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { TabNavigationHorizontalComponent } from './tab-navigation-horizontal/tab-navigation-horizontal.component';
import { TabOptionsComponent } from './tab-options/tab-options.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from '@ui/tab/components/tabs/tabs.component';



@NgModule({
    declarations: [
        TabNavigationSquareComponent,
        TabNavigationHorizontalComponent,
        TabOptionsComponent,
        TabComponent,
        TabsComponent
    ],
  exports: [
    TabNavigationSquareComponent,
    TabNavigationHorizontalComponent,
    TabOptionsComponent,
    TabComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class TabModule { }
