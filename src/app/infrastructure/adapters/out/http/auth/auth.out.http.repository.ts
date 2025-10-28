import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http/http.service";

import {environment} from "../../../../../../environments/environment";

import {AuthRepositoryPort} from "@application/ports/out/auth/auth.repository.port";
import {AuthOutHttpMapper} from "@infrastructure/adapters/out/http/auth/auth.out.http.mapper";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {SessionEntity} from "@domain/entities/account/session.entity";

@Injectable()
export class AuthOutHttpRepository implements AuthRepositoryPort {

  public readonly apiUrl = environment.uri;

  public mapper: AuthOutHttpMapper = new AuthOutHttpMapper();


  constructor(
    private httpService: HttpService
  ) {
  }

  public login(
    dataToLogin: { email: string; password: string }
  ): Observable<{ token: string; is_two_factor: 0 | 1; }> {
    return this.httpService.post<
      {
        token: string;
        is_two_factor: 0 | 1;
      },
      {
        email: string;
        password: string;
      }
    >(`${this.apiUrl}auth/login`, dataToLogin);
  }

  public loginGoogle(
    tokenGoogle: string
  ): Observable<{ token: string }> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${tokenGoogle}`
    })
    return this.httpService.get<{ token: string }>(`${this.apiUrl}auth/login/google`, {headers});
  }

  public logout(): Observable<void> {
    const token = localStorage.getItem("x-token");
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    })
    return this.httpService.get<void>(`${this.apiUrl}auth/login/logout`, {headers});
  }

  public verify(): Observable<{ token: string; account: AccountEntity & { jti: string } }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{
      token: string;
      account: AccountEntity & { jti: string }
    }>(`${this.apiUrl}auth/verify/login`, {headers});
  }

  public consultTwoFactor(): Observable<{ twoFactorCompleted: 0 | 1 }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{ twoFactorCompleted: 0 | 1 }>(`${this.apiUrl}auth/two-factor/consult`, {headers});
  }

  public verifyTwoFactor(otp: string): Observable<{ validTwoFactor: 0 | 1; }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{
      validTwoFactor: 0 | 1;
    }>(`${this.apiUrl}auth/two-factor/verify/${otp}`, {headers});
  }

  public consultSessions(username: string): Observable<{ sessions: SessionEntity[] }> {
    return this.httpService.get<{ sessions: SessionEntity[] }>(`${this.apiUrl}auth/consult/sessions/${username}`);
  }

  public closeSession(username: string, idSession: string): Observable<{ message: string }> {
    return this.httpService.get<{
      message: string
    }>(`${this.apiUrl}auth/close-session/${username}/${idSession}`);
  }


}
