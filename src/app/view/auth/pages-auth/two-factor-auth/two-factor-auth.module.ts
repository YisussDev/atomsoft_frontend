import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TwoFactorAuthRoutingModule} from './two-factor-auth-routing.module';
import {TwoFactorAuthComponent} from './two-factor-auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {OtpModule} from "@infrastructure/ui/components/otp/otp.module";
import {AuthCompositionModule} from "../../../../composition/auth/auth.composition.module";


@NgModule({
  declarations: [
    TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    TwoFactorAuthRoutingModule,
    ReactiveFormsModule,
    AuthCompositionModule,
    OtpModule
  ]
})
export class TwoFactorAuthModule {
}
