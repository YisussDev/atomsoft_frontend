import {Injectable} from "@angular/core";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {map, Observable} from "rxjs";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {environment} from "../../../../../../environments/environment";
import {SessionEntity} from "@domain/entities/account/session.entity";
import {HttpService} from "@core/services/http/http.service";
import {HttpHeaders} from "@angular/common/http";
import {AccountOutHttpEntity} from "@infrastructure/adapters/out/http/account/account.out.http.entity";
import {AccountOutHttpMapper} from "@infrastructure/adapters/out/http/account/account.out.http.mapper";

@Injectable()
export class AccountOutHttpRepository implements AccountRepositoryPort {

  public readonly apiUrl = environment.uri;

  public mapper: AccountOutHttpMapper = new AccountOutHttpMapper();


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
    totalFounded?: number;
  }> {
    return this.httpService.get<{
      data: AccountOutHttpEntity[];
      pageActual?: number;
      limitActual?: number;
      totalFounded?: number;
    }>(`${this.apiUrl}account`).pipe(
      map((response) => {
        const dataMapped: AccountEntity[] = response.data.map(itemInfra => {
          return this.mapper.toDomain(itemInfra);
        });
        return {
          data: dataMapped,
          pageActual: response.pageActual,
          limitActual: response.limitActual,
          totalFounded: response.totalFounded,
        }
      })
    );
  }

  public findOne(
    query: { [p: string]: string },
  ): Observable<{ data: AccountEntity | null }> {
    return this.httpService.get<{
      data: AccountEntity | null;
    }>(`${this.apiUrl}account`).pipe(
      map((response) => {
        return {
          data: response.data ? (this.mapper.toDomain(response.data)) : null,
        }
      })
    );
  }

  public create(
    dataToCreate: AccountEntity
  ): Observable<AccountEntity> {
    return this.httpService.post<AccountEntity, AccountEntity>(`${this.apiUrl}account`, dataToCreate);
  }

  public update(
    keyToSearch: string,
    dataToUpdate: AccountEntity
  ): Observable<{ data: AccountEntity }> {
    return this.httpService.patch<{
      data: AccountEntity
    }, AccountEntity>(`${this.apiUrl}account/${keyToSearch}`, dataToUpdate);
  }

  public delete(
    keyToDelete: string
  ): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}account/${keyToDelete}`);
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
