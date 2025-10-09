import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "@core/services/http/http.service";

@NgModule({
  providers: [
    HttpService
  ],
  imports: [HttpClientModule]
})
export class ClientOutHttpModule {
}
