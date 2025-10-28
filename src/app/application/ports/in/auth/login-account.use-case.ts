import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AuthRepositoryPort} from "@application/ports/out/auth/auth.repository.port";

@Injectable()
export class LoginAccountUseCase {

  constructor(
    @Inject("AuthRepositoryPort")
    private readonly repository: AuthRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(dataToLogin: { email: string, password: string }): Observable<{
    token: string;
    is_two_factor: 0 | 1
  }> {
    return of(dataToLogin).pipe(
      map(dataLogin => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataToLogin);
        accountLogin.validateToLogin();
        return dataLogin;
      }),
      mergeMap((dataLogin) => {
        return this.repository.login(dataLogin).pipe(
          tap((response) => {
            localStorage.setItem('x-token', response.token);
            this.notificationService.success("Login successfully!");
            if (response.is_two_factor == 1) {
              this.navigationService.navigateTo("/auth/two-factor-auth").then();
            } else {
              this.navigationService.navigateTo("/sudo").then();
              // this.navigationService.navigateTo("/admin").then();
            }
          })
        )
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.error(`Error de dominio..., ${error}`);
        } else {
          this.notificationService.info(error.error.message);
        }
        return throwError(() => error);
      })
    )
  }

}
