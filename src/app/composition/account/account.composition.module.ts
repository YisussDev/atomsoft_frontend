import {NgModule} from "@angular/core";
import {FindAllAccountUseCase} from "@application/ports/in/account/find-all-account.use-case";
import {FindOneAccountUseCase} from "@application/ports/in/account/find-one-account.use-case";
import {CreateAccountUseCase} from "@application/ports/in/account/create-account.use-case";
import {UpdateAccountUseCase} from "@application/ports/in/account/update-account.use-case";
import {DeleteAccountUseCase} from "@application/ports/in/account/delete-account.use-case";
import {AdminGuard} from "@application/guards/auth/admin.guard";
import {AuthGuard} from "@application/guards/auth/auth.guard";
import {AccountOutHttpModule} from "@infrastructure/adapters/out/http/account/account.out.http.module";
import {TwoFactorGuard} from "@application/guards/auth/two-factor.guard";

@NgModule({
  imports: [
    // ...Implementations
    AccountOutHttpModule,
  ],
  providers: [
    FindAllAccountUseCase,
    FindOneAccountUseCase,
    CreateAccountUseCase,
    UpdateAccountUseCase,
    DeleteAccountUseCase,
    AdminGuard,
    AuthGuard,
    TwoFactorGuard
  ]
})
export class AccountCompositionModule {
}
