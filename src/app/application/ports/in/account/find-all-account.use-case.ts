import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";

import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class FindAllAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: AccountEntity[] }> {
    return of(query).pipe(
      mergeMap(() => {
        return this.repository.findAll(query);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
