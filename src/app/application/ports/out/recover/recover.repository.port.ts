import {Observable} from "rxjs";

export interface RecoverRepositoryPort {

  recover(email: string): Observable<{ message: "ok" }>;

  validateTokenToRecover(token: string, email: string): Observable<{ message: "ok" }>;

  recoverPasswordWithToken(token: string, email: string, newPassword: string): Observable<{ message: "ok" }>;

}
