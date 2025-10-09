import {AccountEntity} from "@domain/entities/account/account.entity";
import {Observable} from "rxjs";
import {SessionEntity} from "@domain/entities/account/session.entity";

export interface AccountRepositoryPort {
  findAll(
    query: { [T: string]: any }
  ): Observable<{
    data: AccountEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }>;

  findOne(
    query: { [key: string]: string | number },
  ): Observable<{ data: AccountEntity | null }>;

  create(
    dataToCreate: AccountEntity,
  ): Observable<AccountEntity>;

  update(
    keyToSearch: string,
    dataToUpdate: AccountEntity,
  ): Observable<{ data: AccountEntity }>;

  delete(
    keyToDelete: string,
  ): Observable<void>;

  login(dataToLogin: { email: string; password: string }):
    Observable<{
      token: string;
      is_two_factor: 0 | 1;
    }>

  loginGoogle(tokenGoogle: string):
    Observable<{
      token: string;
    }>

  logout(): Observable<void>;

  verify(): Observable<{ token: string; account: AccountEntity & { jti: string } }>

  consultSessions(username: string): Observable<{ sessions: SessionEntity[] }>

  closeSession(username: string, idSession: string): Observable<{ message: string }>

  consultTwoFactor(): Observable<{ twoFactorCompleted: 0 | 1; }>;

  verifyTwoFactor(otp: string): Observable<{ validTwoFactor: 0 | 1; }>;

}
