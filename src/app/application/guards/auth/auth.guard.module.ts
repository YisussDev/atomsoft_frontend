import {NgModule} from "@angular/core";
import {AccountUseCaseModule} from "@application/use-cases/account/account.use-case.module";
import {AdminGuard} from "@application/guards/auth/admin.guard";
import {AuthGuard} from "@application/guards/auth/auth.guard";
import {TwoFactorGuard} from "@application/guards/auth/two-factor.guard";

@NgModule({
  imports: [
    AccountUseCaseModule
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    TwoFactorGuard,
  ]
})
export class AuthGuardModule {
}
