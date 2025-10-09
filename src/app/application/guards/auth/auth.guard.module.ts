import {NgModule} from "@angular/core";
import {AdminGuard} from "@application/guards/auth/admin.guard";
import {AuthGuard} from "@application/guards/auth/auth.guard";
import {TwoFactorGuard} from "@application/guards/auth/two-factor.guard";
import {AccountCompositionModule} from "../../../composition/account/account.composition.module";
import {VerifyAccountUseCase} from "@application/ports/in/account/verify-account.use-case";

@NgModule({
  imports: [
    AccountCompositionModule
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    TwoFactorGuard,
    VerifyAccountUseCase
  ]
})
export class AuthGuardModule {
}
