import {NgModule} from "@angular/core";

import {ApplicationOutHttpRepository} from "@infrastructure/adapters/out/http/application/application.out.http.repository";
import {ClientOutHttpModule} from "@infrastructure/adapters/out/http/client/client.out.http.module";

@NgModule({
  imports: [
    ClientOutHttpModule
  ],
  providers: [
    {
      provide: "ApplicationRepositoryPort",
      useClass: ApplicationOutHttpRepository
    }
  ],
})
export class ApplicationOutHttpModule {
}
