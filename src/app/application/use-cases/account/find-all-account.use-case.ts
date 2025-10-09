import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";

import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepository} from "@domain/repositories/account/account.repository";

@Injectable()
export class FindAllAccountUseCase {

  constructor(
    @Inject("AccountRepository")
    private readonly repository: AccountRepository,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: AccountEntity[] }> {
    return of(query).pipe(
      mergeMap((dataLogin) => {
        return this.repository.findAll(query).pipe(
          tap((response) => {
          })
        )
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.error(`Error de dominio..., ${error}`);
        } else {
          const message = 'Ocurrió un error inesperado';
          this.notificationService.error(message);
        }
        return throwError(() => error);
      })
    )
  }

}
