import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Injectable()
export class LoginWithGoogleAccountUseCase {

  constructor(
    @Inject("AccountRepository")
    private readonly repository: AccountRepository,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(tokenGoogle: string): Observable<{ token: string }> {
    return of(tokenGoogle).pipe(
      map(dataLogin => {
        return dataLogin;
      }),
      mergeMap((dataLogin) => {
        return this.repository.loginGoogle(tokenGoogle).pipe(
          tap((response) => {
            localStorage.setItem('x-token', response.token);
            this.notificationService.success("Login with Google successfully!");
            this.navigationService.navigateTo("/admin").then();
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
