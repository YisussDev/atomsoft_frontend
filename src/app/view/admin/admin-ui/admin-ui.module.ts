import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AccountUseCaseModule} from "@application/use-cases/account/account.use-case.module";
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {RouterLink} from "@angular/router";
import {IconsModule} from "@ui/icons/icons.module";


@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  exports: [
    AdminHeaderComponent
  ],
    imports: [
        CommonModule,
        AccountUseCaseModule,
        ClickOutsideModule,
        RouterLink,
        IconsModule
    ]
})
export class AdminUiModule {
}
