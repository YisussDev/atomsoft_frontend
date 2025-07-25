import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputsModule} from "@ui/inputs/inputs.module";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {BoxModule} from "@ui/box/box.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule,
    BoxModule,
  ],
  providers: []
})
export class LoginModule {
}
