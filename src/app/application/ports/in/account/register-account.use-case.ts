import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class RegisterAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(dataToRegister: AccountEntity): Observable<{ token: string; is_two_factor: 0 | 1 }> {
    console.log("peticion...")
    return of(dataToRegister).pipe(
      map(dataLogin => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataToRegister);
        accountLogin.validateToLogin();
        return dataLogin;
      }),
      mergeMap((dataLogin) => {
        return this.repository.create(dataLogin).pipe(
          tap((response) => {
            localStorage.setItem('x-token', response.token);
            this.notificationService.success("Login successfully!");
            if (response.is_two_factor == 1) {
              this.navigationService.navigateTo("/auth/two-factor-auth").then();
            } else {
              this.navigationService.navigateTo("/admin").then();
            }
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
