import {NgModule} from "@angular/core";
import {RecoverAccountUseCase} from "@application/ports/in/recover/recover-account.use-case";
import {
  RecoverValidateTokenAccountUseCase
} from "@application/ports/in/recover/recover-validate-token-account.use-case";
import {
  RecoverPasswordWithTokenAccountUseCase
} from "@application/ports/in/recover/recover-password-with-token-account.use-case";
import {RecoverOutHttpModule} from "@infrastructure/adapters/out/http/recover/recover.out.http.module";

@NgModule({
  imports: [
    // ...Implementations
    RecoverOutHttpModule
  ],
  providers: [
    RecoverAccountUseCase,
    RecoverValidateTokenAccountUseCase,
    RecoverPasswordWithTokenAccountUseCase
  ]
})
export class RecoverCompositionModule {
}
