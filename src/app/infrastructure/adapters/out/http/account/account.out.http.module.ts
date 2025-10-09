import {NgModule} from "@angular/core";
import {AccountOutHttpRepository} from "@infrastructure/adapters/out/http/account/account.out.http.repository";
import {ClientOutHttpModule} from "@infrastructure/adapters/out/http/client/client.out.http.module";

@NgModule({
  imports: [
    ClientOutHttpModule
  ],
  providers: [
    {
      provide: "AccountRepositoryPort",
      useClass: AccountOutHttpRepository
    }
  ],
})
export class AccountOutHttpModule {
}
