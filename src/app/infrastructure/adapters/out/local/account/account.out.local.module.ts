import {NgModule} from "@angular/core";
import {AccountOutHttpRepository} from "@infrastructure/adapters/out/http/account/account.out.http.repository";

@NgModule({
  providers: [
    {
      provide: "AccountRepositoryPort",
      useClass: AccountOutHttpRepository
    }
  ],
})
export class AccountOutLocalModule {
}
