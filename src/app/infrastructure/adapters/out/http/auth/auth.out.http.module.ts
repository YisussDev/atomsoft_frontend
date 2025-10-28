import {NgModule} from "@angular/core";

import {AuthOutHttpRepository} from "@infrastructure/adapters/out/http/auth/auth.out.http.repository";
import {ClientOutHttpModule} from "@infrastructure/adapters/out/http/client/client.out.http.module";

@NgModule({
  imports: [
    ClientOutHttpModule
  ],
  providers: [
    {
      provide: "AuthRepositoryPort",
      useClass: AuthOutHttpRepository
    }
  ],
})
export class AuthOutHttpModule {
}
