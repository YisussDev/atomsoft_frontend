import {NgModule} from "@angular/core";

import {RecoverOutHttpRepository} from "@infrastructure/adapters/out/http/recover/recover.out.http.repository";
import {ClientOutHttpModule} from "@infrastructure/adapters/out/http/client/client.out.http.module";

@NgModule({
  imports: [
    ClientOutHttpModule
  ],
  providers: [
    {
      provide: "RecoverRepositoryPort",
      useClass: RecoverOutHttpRepository
    }
  ],
})
export class RecoverOutHttpModule {
}
