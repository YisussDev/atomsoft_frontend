import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {RouterLink} from "@angular/router";
import {IconsModule} from "@ui/icons/icons.module";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {AuthCompositionModule} from "../../../composition/auth/auth.composition.module";


@NgModule({
  providers: [
    NavigationUi
  ],
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
    AuthCompositionModule,
  ]
})
export class AdminUiModule {
}
