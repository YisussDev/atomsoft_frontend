import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonGenericComponent} from "./button-generic/button-generic.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ButtonContainerComponent} from './button-container/button-container.component';
import {ButtonDropdownComponent} from "./button-dropdown/button-dropdown.component";
import {ButtonPrimaryComponent} from "./button-primary/button-primary.component";
import {ButtonSecondaryComponent} from "./button-secondary/button-secondary.component";
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {ButtonSquareLinkComponent} from "./button-square-link/button-square-link.component";


@NgModule({
  declarations: [
    ButtonGenericComponent,
    ButtonContainerComponent,
    ButtonDropdownComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSquareLinkComponent
  ],
  exports: [
    ButtonGenericComponent,
    ButtonContainerComponent,
    ButtonDropdownComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    ButtonSquareLinkComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ClickOutsideModule,
  ]
})
export class ButtonsModule {
}
