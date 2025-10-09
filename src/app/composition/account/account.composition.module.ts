import {NgModule} from "@angular/core";
import {FindAllAccountUseCase} from "@application/ports/in/account/find-all-account.use-case";
import {FindOneAccountUseCase} from "@application/ports/in/account/find-one-account.use-case";
import {CreateAccountUseCase} from "@application/ports/in/account/create-account.use-case";
import {UpdateAccountUseCase} from "@application/ports/in/account/update-account.use-case";
import {DeleteAccountUseCase} from "@application/ports/in/account/delete-account.use-case";
import {LoginAccountUseCase} from "@application/ports/in/account/login-account.use-case";
import {LoginWithGoogleAccountUseCase} from "@application/ports/in/account/login-with-google-account.use-case";
import {VerifyAccountUseCase} from "@application/ports/in/account/verify-account.use-case";
import {VerifyTwoFactorAccountUseCase} from "@application/ports/in/account/verify-two-factor-account.use-case";
import {ConsultSessionsAccountUseCase} from "@application/ports/in/account/consult-sessions-account.use-case";
import {ConsultTwoFactorAccountUseCase} from "@application/ports/in/account/consult-two-factor-account.use-case";
import {CloseSessionAccountUseCase} from "@application/ports/in/account/close-session-account.use-case";
import {LogoutAccountUseCase} from "@application/ports/in/account/logout-account.use-case";

@NgModule({
  imports: [
    // ...Implementations
  ],
  providers: [
    FindAllAccountUseCase,
    FindOneAccountUseCase,
    CreateAccountUseCase,
    UpdateAccountUseCase,
    DeleteAccountUseCase,
    LoginAccountUseCase,
    LoginWithGoogleAccountUseCase,
    VerifyAccountUseCase,
    VerifyTwoFactorAccountUseCase,
    ConsultSessionsAccountUseCase,
    ConsultTwoFactorAccountUseCase,
    CloseSessionAccountUseCase,
    LogoutAccountUseCase
  ]
})
export class AccountCompositionModule {
}
