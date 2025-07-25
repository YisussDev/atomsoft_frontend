import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import {ViewDataSessionComponent} from './utils/view-data-session/view-data-session.component';
import {ButtonsModule} from "../../buttons/buttons.module";
import {InputsModule} from "../../inputs/inputs.module";
import {ClickOutsideModule} from "../../../core/directives/click-outside/click-outside.module";
import {UserHttpModule} from "../../../infrastructure/http/user/user.http.module";


@NgModule({
  declarations: [
    HeaderComponent,
    ViewDataSessionComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule,
    ClickOutsideModule,
    UserHttpModule
  ],
  providers: [
  ]
})
export class HeaderModule {
}
