import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonGenericComponent} from "./button-generic/button-generic.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ButtonContainerComponent} from './button-container/button-container.component';
import {ButtonDropdownComponent} from "./button-dropdown/button-dropdown.component";
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {ButtonSquareLinkComponent} from "./button-square-link/button-square-link.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ButtonGenericComponent,
    ButtonContainerComponent,
    ButtonDropdownComponent,
    ButtonSquareLinkComponent
  ],
  exports: [
    ButtonGenericComponent,
    ButtonContainerComponent,
    ButtonDropdownComponent,
    ButtonSquareLinkComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ClickOutsideModule,
    FormsModule,
  ]
})
export class ButtonsModule {
}
