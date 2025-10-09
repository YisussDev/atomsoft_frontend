import {Injectable} from "@angular/core";
import {HttpService} from "@core/services/http/http.service";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {Observable, of} from "rxjs";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {SessionEntity} from "@domain/entities/account/session.entity";
import {environment} from "../../../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AccountHttpRepository implements AccountRepository {

  public readonly apiUrl = environment.uri;


  constructor(
    private httpService: HttpService
  ) {
  }

  public findAll(
    query: { [p: string]: any },
  ): Observable<{
    data: AccountEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number
  }> {
    return of();
  }

  public findOne(
    query: { [p: string]: string },
  ): Observable<AccountEntity | null> {
    return of();
  }

  public create(
    dataToCreate: AccountEntity
  ): Observable<AccountEntity> {
    return of()
  }

  public update(
    keyToSearch: string,
    dataToUpdate: AccountEntity
  ): Observable<AccountEntity> {
    return this.httpService.patch<AccountEntity, AccountEntity>(`${this.apiUrl}account/${keyToSearch}`, dataToUpdate);
  }

  public delete(
    keyToDelete: string
  ): Observable<void> {
    return of();
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
    >(`${this.apiUrl}account/login`, dataToLogin);
  }

  public loginGoogle(
    tokenGoogle: string
  ): Observable<{ token: string }> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${tokenGoogle}`
    })
    return this.httpService.get<{ token: string }>(`${this.apiUrl}account/login/google`, {headers});
  }

  public logout(): Observable<void> {
    const token = localStorage.getItem("x-token");
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    })
    return this.httpService.get<void>(`${this.apiUrl}account/login/logout`, {headers});
  }


  public verify(): Observable<{ token: string; account: AccountEntity & { jti: string } }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{
      token: string;
      account: AccountEntity & { jti: string }
    }>(`${this.apiUrl}account/verify/login`, {headers});
  }

  public consultTwoFactor(): Observable<{ twoFactorCompleted: 0 | 1 }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{ twoFactorCompleted: 0 | 1 }>(`${this.apiUrl}account/two-factor/consult`, {headers});
  }

  public verifyTwoFactor(otp: string): Observable<{ validTwoFactor: 0 | 1; }> {
    const headers: HttpHeaders = new HttpHeaders({
      "hidden-toast": "true"
    })
    return this.httpService.get<{
      validTwoFactor: 0 | 1;
    }>(`${this.apiUrl}account/two-factor/verify/${otp}`, {headers});
  }

  public consultSessions(username: string): Observable<{ sessions: SessionEntity[] }> {
    return this.httpService.get<{ sessions: SessionEntity[] }>(`${this.apiUrl}account/consult/sessions/${username}`);
  }

  public closeSession(username: string, idSession: string): Observable<{ message: string }> {
    return this.httpService.get<{
      message: string
    }>(`${this.apiUrl}account/close-session/${username}/${idSession}`);
  }


}
