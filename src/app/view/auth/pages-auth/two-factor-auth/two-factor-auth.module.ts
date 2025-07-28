import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TwoFactorAuthRoutingModule} from './two-factor-auth-routing.module';
import {TwoFactorAuthComponent} from './two-factor-auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountUseCaseModule} from "@application/use-cases/account/account.use-case.module";


@NgModule({
  declarations: [
    TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    TwoFactorAuthRoutingModule,
    ReactiveFormsModule,
    AccountUseCaseModule
  ]
})
export class TwoFactorAuthModule {
}
