import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStoreHomeRoutingModule } from './page-store-home-routing.module';
import { PageStoreHomeComponent } from './page-store-home.component';
import { AppStorePrincipalComponent } from './utils/app-store-principal/app-store-principal.component';
import { AppStoreCardComponent } from './utils/app-store-card/app-store-card.component';
import {TabModule} from "@ui/tab/tab.module";
import {TypographyModule} from "@core/directives/typography/typography.module";


@NgModule({
  declarations: [
    PageStoreHomeComponent,
    AppStorePrincipalComponent,
    AppStoreCardComponent
  ],
  imports: [
    CommonModule,
    PageStoreHomeRoutingModule,
    TabModule,
    TypographyModule
  ]
})
export class PageStoreHomeModule { }
