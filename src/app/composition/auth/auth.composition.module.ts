import {NgModule} from "@angular/core";
import {AuthOutHttpModule} from "@infrastructure/adapters/out/http/auth/auth.out.http.module";
import {LoginAccountUseCase} from "@application/ports/in/auth/login-account.use-case";
import {LoginWithGoogleAccountUseCase} from "@application/ports/in/auth/login-with-google-account.use-case";
import {LogoutAccountUseCase} from "@application/ports/in/auth/logout-account.use-case";
import {VerifyAccountUseCase} from "@application/ports/in/auth/verify-account.use-case";
import {VerifyTwoFactorAccountUseCase} from "@application/ports/in/auth/verify-two-factor-account.use-case";
import {ConsultSessionsAccountUseCase} from "@application/ports/in/auth/consult-sessions-account.use-case";
import {CloseSessionAccountUseCase} from "@application/ports/in/auth/close-session-account.use-case";
import {AuthGuard} from "@application/guards/auth/auth.guard";
import {AdminGuard} from "@application/guards/auth/admin.guard";
import {TwoFactorGuard} from "@application/guards/auth/two-factor.guard";
import {ConsultTwoFactorAccountUseCase} from "@application/ports/in/auth/consult-two-factor-account.use-case";
import {SudoGuard} from "@application/guards/auth/sudo.guard";

@NgModule({
  imports: [
    // ...Implementations
    AuthOutHttpModule
  ],
  providers: [
    LoginAccountUseCase,
    LoginWithGoogleAccountUseCase,
    VerifyAccountUseCase,
    VerifyTwoFactorAccountUseCase,
    ConsultTwoFactorAccountUseCase,
    ConsultSessionsAccountUseCase,
    CloseSessionAccountUseCase,
    LogoutAccountUseCase,
    AuthGuard,
    AdminGuard,
    SudoGuard,
    TwoFactorGuard
  ]
})
export class AuthCompositionModule {
}
