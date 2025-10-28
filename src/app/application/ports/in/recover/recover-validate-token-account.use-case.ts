import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {RecoverRepositoryPort} from "@application/ports/out/recover/recover.repository.port";

@Injectable()
export class RecoverValidateTokenAccountUseCase {

  constructor(
    @Inject("RecoverRepositoryPort")
    private readonly repository: RecoverRepositoryPort,
    private notificationService: NotificationService,
    private navigationUi: NavigationUi,
  ) {
  }

  public execute(token: string, email: string): Observable<{ message: "ok" }> {
    return new Observable<void>((subscriber) => {
      subscriber.next();
      subscriber.complete();
    }).pipe(
      mergeMap(() => {
        return this.repository.validateTokenToRecover(token, email).pipe(
          tap((response) => {
          })
        );
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.info(`Error de dominio..., ${error.message}`);
        } else {
          this.notificationService.info(error.error.message);
        }
        this.navigationUi.goToAuth();
        return throwError(() => error);
      })
    );
  }

}
