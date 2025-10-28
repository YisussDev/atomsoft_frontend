import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecoverRoutingModule} from './recover-routing.module';
import {RecoverComponent} from './recover.component';
import {RecoverSendCodeComponent} from './recover-send-code/recover-send-code.component';
import {RecoverResetPasswordComponent} from './recover-reset-password/recover-reset-password.component';
import {BoxModule} from "@ui/box/box.module";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {InputsModule} from "@ui/inputs/inputs.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {RecoverCompositionModule} from "../../../../composition/recover/recover.composition.module";


@NgModule({
  declarations: [
    RecoverComponent,
    RecoverSendCodeComponent,
    RecoverResetPasswordComponent
  ],
  providers: [
    NavigationUi
  ],
  imports: [
    CommonModule,
    RecoverRoutingModule,
    BoxModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    RecoverCompositionModule
  ]
})
export class RecoverModule {
}
