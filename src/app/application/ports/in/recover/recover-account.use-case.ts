import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {RecoverRepositoryPort} from "@application/ports/out/recover/recover.repository.port";

@Injectable()
export class RecoverAccountUseCase {

  constructor(
    @Inject("RecoverRepositoryPort")
    private readonly repository: RecoverRepositoryPort,
    private notificationService: NotificationService,
    private navigationUi: NavigationUi,
  ) {
  }

  public execute(email: string): Observable<{ message: "ok" }> {
    return of(email).pipe(
      mergeMap((email) => {
        return this.repository.recover(email).pipe(
          tap((response) => {
            this.notificationService.success("Reset successfully, email recovery send!");
            // this.navigationUi.goToAuth();
          })
        )
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.info(`Error de dominio..., ${error}`);
        } else {
          // const message = 'Ocurrió un error inesperado';
          this.notificationService.error(error.error.message);
        }
        return throwError(() => error);
      })
    )
  }

}
