import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";
import {NotificationService} from "@core/services/notification/notification.service";

@Injectable()
export class DeleteApplicationUseCase {

  constructor(
    @Inject("ApplicationRepositoryPort")
    private readonly repository: ApplicationRepositoryPort,
    private notificationService: NotificationService
  ) {
  }

  public execute(keyToDelete: string): Observable<void> {
    return of(keyToDelete).pipe(
      mergeMap(() => {
        return this.repository.delete(keyToDelete).pipe(
          tap(() => {
            this.notificationService.info("Application Deleted.");
          })
        );
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
