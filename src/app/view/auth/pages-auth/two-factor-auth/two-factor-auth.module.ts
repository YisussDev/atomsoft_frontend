import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TwoFactorAuthRoutingModule} from './two-factor-auth-routing.module';
import {TwoFactorAuthComponent} from './two-factor-auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountCompositionModule} from "../../../../composition/account/account.composition.module";


@NgModule({
  declarations: [
    TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    TwoFactorAuthRoutingModule,
    ReactiveFormsModule,
    AccountCompositionModule
  ]
})
export class TwoFactorAuthModule {
}
