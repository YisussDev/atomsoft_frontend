import {Injectable} from "@angular/core";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {Observable, of} from "rxjs";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {environment} from "../../../../../../environments/environment";
import {SessionEntity} from "@domain/entities/account/session.entity";

@Injectable()
export class AccountOutHttpRepository implements AccountRepositoryPort {

  private apiUrl: string = environment.uri;

  constructor() {
  }


  public findAll(query: { [p: string]: any }): Observable<{
    data: AccountEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number
  }> {
    return of();
  }

  public findOne(
    query: {
      [p: string]: string;
    }): Observable<{
    data: AccountEntity | null
  }> {
    return of();
  }


  public create(dataToCreate: AccountEntity): Observable<AccountEntity> {
    return of();
  }

  public update(keyToSearch: string, dataToUpdate: AccountEntity): Observable<{ data: AccountEntity }> {
    return of();
  }

  public delete(keyToDelete: string): Observable<void> {
    return of();
  }

  public login(dataToLogin: { email: string; password: string }): Observable<{ token: string; is_two_factor: 0 | 1 }> {
    return of();
  }

  public loginGoogle(tokenGoogle: string): Observable<{ token: string }> {
    return of();
  }

  public verify(): Observable<{ token: string; account: AccountEntity & { jti: string } }> {
    return of();
  }

  public verifyTwoFactor(otp: string): Observable<{ validTwoFactor: 0 | 1 }> {
    return of();
  }

  public consultTwoFactor(): Observable<{ twoFactorCompleted: 0 | 1 }> {
    return of();
  }

  public consultSessions(username: string): Observable<{ sessions: SessionEntity[] }> {
    return of();
  }

  public closeSession(username: string, idSession: string): Observable<{ message: string }> {
    return of();
  }

  public logout(): Observable<void> {
    return of();
  }

}
