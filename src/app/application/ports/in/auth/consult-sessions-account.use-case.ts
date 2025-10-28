import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SessionEntity} from "@domain/entities/account/session.entity";
import {AuthRepositoryPort} from "@application/ports/out/auth/auth.repository.port";

@Injectable()
export class ConsultSessionsAccountUseCase {

  constructor(
    @Inject("AuthRepositoryPort")
    private readonly repository: AuthRepositoryPort,
  ) {
  }

  public execute(username: string): Observable<{ sessions: SessionEntity[] }> {
    return of(username).pipe(
      mergeMap((dataLogin) => {
        return this.repository.consultSessions(username)
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
