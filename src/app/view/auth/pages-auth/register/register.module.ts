import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {BoxModule} from "@ui/box/box.module";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputsModule} from "@ui/inputs/inputs.module";
import {AccountCompositionModule} from "../../../../composition/account/account.composition.module";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    BoxModule,
    ButtonsModule,
    FormsModule,
    InputsModule,
    ReactiveFormsModule,
    AccountCompositionModule
  ]
})
export class RegisterModule {
}
