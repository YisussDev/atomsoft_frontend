import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {RecoverRepositoryPort} from "@application/ports/out/recover/recover.repository.port";

@Injectable()
export class RecoverPasswordWithTokenAccountUseCase {

  constructor(
    @Inject("RecoverRepositoryPort")
    private readonly repository: RecoverRepositoryPort,
    private notificationService: NotificationService,
    private navigationUi: NavigationUi,
  ) {
  }

  public execute(token: string, email: string, newPassword: string): Observable<{ message: "ok" }> {

    return new Observable<void>((subscriber) => {
      subscriber.next();
      subscriber.complete();
    }).pipe(
      mergeMap(() => {
        return this.repository.recoverPasswordWithToken(token, email, newPassword).pipe(
          tap((response) => {
            this.notificationService.info("Recover password successfully!");
            this.navigationUi.goToAuth();
          })
        );
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.info(`Error de dominio..., ${error.message}`);
        } else {
          this.notificationService.info(error.error.message);
        }
        return throwError(() => error);
      })
    );

  }

}
