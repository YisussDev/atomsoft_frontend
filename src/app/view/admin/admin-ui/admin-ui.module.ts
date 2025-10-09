import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {RouterLink} from "@angular/router";
import {IconsModule} from "@ui/icons/icons.module";
import {AccountCompositionModule} from "../../../composition/account/account.composition.module";


@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  exports: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterLink,
    IconsModule,
    AccountCompositionModule
  ]
})
export class AdminUiModule {
}
