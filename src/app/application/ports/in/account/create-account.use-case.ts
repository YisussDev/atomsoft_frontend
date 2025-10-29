import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {NotificationService} from "@core/services/notification/notification.service";
import {DomainError} from "@shared/exceptions/domain.exception";

@Injectable()
export class CreateAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private navigationService: NavigationService,
    private notificationService: NotificationService
  ) {
  }

  public execute(dataToCreate: AccountEntity): Observable<{ token: string; is_two_factor: 0 | 1 }> {
    return of(dataToCreate).pipe(
      tap(dataConverted => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataConverted);
        accountLogin.validateToCreate();
        return dataConverted;
      }),
      mergeMap((dataMapped) => {
        return this.repository.create(dataMapped).pipe(
          tap((response) => {
            this.notificationService.success("Account created successfully!");
          })
        );
      }),
      catchError((error: any) => {
        if (error instanceof DomainError) {
          this.notificationService.info("Error de dominio: " + error.message);
        } else {
          this.notificationService.info(error.error.message);
        }
        return throwError(() => error);
      })
    )
  }

}
