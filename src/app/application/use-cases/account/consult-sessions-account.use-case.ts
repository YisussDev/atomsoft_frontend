import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {SessionEntity} from "@domain/entities/account/session.entity";

@Injectable()
export class ConsultSessionsAccountUseCase {

  constructor(
    @Inject("AccountRepository")
    private readonly repository: AccountRepository,
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
