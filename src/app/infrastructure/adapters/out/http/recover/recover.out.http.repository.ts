import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "@core/services/http/http.service";

import {environment} from "../../../../../../environments/environment";

import {RecoverRepositoryPort} from "@application/ports/out/recover/recover.repository.port";
import {RecoverOutHttpMapper} from "@infrastructure/adapters/out/http/recover/recover.out.http.mapper";

@Injectable()
export class RecoverOutHttpRepository implements RecoverRepositoryPort {

  public readonly apiUrl = environment.uri;

  public mapper: RecoverOutHttpMapper = new RecoverOutHttpMapper();


  constructor(
    private httpService: HttpService
  ) {
  }

  public recover(email: string): Observable<{ message: "ok" }> {
    return this.httpService.get<{
      message: "ok"
    }>(`${this.apiUrl}recover/${email}`);
  }

  public validateTokenToRecover(token: string, email: string): Observable<{ message: "ok" }> {
    console.log("Peticion...")
    return this.httpService.post<{
      message: "ok"
    }, {
      token: string;
      email: string;
    }>(`${this.apiUrl}recover/validate-token`, {
      token: token,
      email: email
    });
  }

  public recoverPasswordWithToken(token: string, email: string, newPassword: string): Observable<{ message: "ok" }> {
    return this.httpService.post<{
      message: "ok"
    }, {
      token: string;
      newPassword: string;
      email: string;
    }>(`${this.apiUrl}recover/password/with-token`, {
      token: token,
      email: email,
      newPassword: newPassword,
    });
  }

}
