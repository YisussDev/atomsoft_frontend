import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Injectable()
export class UpdateAccountUseCase {

  constructor(
    @Inject("AccountRepository")
    private readonly repository: AccountRepository,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(keyToSearch: string, dataToUpdate: AccountEntity): Observable<AccountEntity> {
    return of(dataToUpdate).pipe(
      map(dataLogin => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataToUpdate);
        accountLogin.validateToUpdate();
        return dataLogin;
      }),
      mergeMap((dataLogin) => {
        return this.repository.update(keyToSearch, dataToUpdate).pipe(
          tap((response) => {
            this.notificationService.success("Update successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 500);
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
