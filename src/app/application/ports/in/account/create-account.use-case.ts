import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {NotificationService} from "@core/services/notification/notification.service";

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
    console.log("Peticion...")
    return of(dataToCreate).pipe(
      tap(dataConverted => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataConverted);
        accountLogin.validateToCreate();
        return dataConverted;
      }),
      mergeMap((dataMapped) => {
        return this.repository.create(dataMapped).pipe(
          tap((response) => {
            localStorage.setItem('x-token', response.token);
            this.notificationService.success("Login successfully!");
            if (response.is_two_factor == 1) {
              this.navigationService.navigateTo("/auth/two-factor-auth").then();
            } else {
              this.navigationService.navigateTo("/admin").then();
            }
          })
        );
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
