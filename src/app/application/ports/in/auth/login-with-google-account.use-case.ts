import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AuthRepositoryPort} from "@application/ports/out/auth/auth.repository.port";

@Injectable()
export class LoginWithGoogleAccountUseCase {

  constructor(
    @Inject("AuthRepositoryPort")
    private readonly repository: AuthRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(tokenGoogle: string): Observable<{ token: string }> {
    return of(tokenGoogle).pipe(
      mergeMap((tokenGoogle) => {
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
          this.notificationService.info(error.error.message);
        }
        return throwError(() => error);
      })
    )
  }

}
