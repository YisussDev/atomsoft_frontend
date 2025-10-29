import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {DomainError} from "@shared/exceptions/domain.exception";

@Injectable()
export class UpdateAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(keyToSearch: string, dataToUpdate: Partial<AccountEntity>): Observable<{ data: AccountEntity }> {
    return of(dataToUpdate).pipe(
      map(dataToMap => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataToMap);
        accountLogin.validateToUpdate();
        return dataToMap;
      }),
      mergeMap((dataToUpdate) => {
        return this.repository.update(keyToSearch, dataToUpdate).pipe(
          tap((response) => {
            this.notificationService.success("Update successfully!");
            setTimeout(() => {
              // window.location.reload();
            }, 500);
          })
        )
      }),
      catchError((error: any) => {
        if ((error instanceof DomainError)) {
          this.notificationService.error(`Error de dominio..., ${error}`);
        } else {
          const message = error.error.message;
          this.notificationService.error(message);
        }
        return throwError(() => error);
      })
    )
  }

}
