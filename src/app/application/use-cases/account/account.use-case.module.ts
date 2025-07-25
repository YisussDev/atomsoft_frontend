import {NgModule} from "@angular/core";
import {LoginAccountUseCase} from "@application/use-cases/account/login-account.use-case";
import {AccountHttpRepository} from "@infrastructure/adapters/http/account/account.http.repository";
import {VerifyAccountUseCase} from "@application/use-cases/account/verify-account.use-case";
import {LoginWithGoogleAccountUseCase} from "@application/use-cases/account/login-with-google-account.use-case";
import {LogoutAccountUseCase} from "@application/use-cases/account/logout-account.use-case";
import {UpdateAccountUseCase} from "@application/use-cases/account/update-account.use-case";
import {ConsultSessionsAccountUseCase} from "@application/use-cases/account/consult-sessions-account.use-case";
import {CloseSessionAccountUseCase} from "@application/use-cases/account/close-session-account.use-case";

@NgModule({
  imports: [],
  providers: [
    {
      provide: "AccountRepository",
      useClass: AccountHttpRepository
    },
    LoginAccountUseCase,
    VerifyAccountUseCase,
    LoginWithGoogleAccountUseCase,
    LogoutAccountUseCase,
    UpdateAccountUseCase,
    ConsultSessionsAccountUseCase,
    CloseSessionAccountUseCase
  ],
  exports: []
})
export class AccountUseCaseModule {
}
