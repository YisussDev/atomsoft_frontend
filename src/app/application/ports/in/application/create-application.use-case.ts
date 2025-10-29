import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";

@Injectable()
export class CreateApplicationUseCase {

  constructor(
    @Inject("ApplicationRepositoryPort")
    private readonly repository: ApplicationRepositoryPort,
    private notificationUi: NotificationUi
  ) {
  }

  public execute(dataToCreate: ApplicationEntity): Observable<ApplicationEntity> {
    return of(dataToCreate).pipe(
      tap(dataTap => {
        const instanceDomain: ApplicationEntity = Object.assign(new ApplicationEntity(), dataTap);
        instanceDomain.validateToCreate();
        return dataTap;
      }),
      mergeMap((dataTapped) => {
        return this.repository.create(dataTapped);
      }),
      catchError((error: any) => {
        if (error instanceof ValidatorException) {
          this.notificationUi.showError("Domain error...");
        }
        return throwError(() => error);
      })
    )
  }

}
