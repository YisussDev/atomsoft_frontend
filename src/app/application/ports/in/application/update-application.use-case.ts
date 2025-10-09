import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";

@Injectable()
export class UpdateApplicationUseCase {

    constructor(
        @Inject("ApplicationRepositoryPort")
        private readonly repository: ApplicationRepositoryPort,
        private notificationUi: NotificationUi
    ) {
    }

    public execute(keyToSearch: string, dataToUpdate: ApplicationEntity): Observable<{ data: ApplicationEntity }> {
        return of(dataToUpdate).pipe(
            map(dataToUpdate => {
                const instanceDomain: ApplicationEntity = Object.assign(new ApplicationEntity(), dataToUpdate);
                instanceDomain.validateToUpdate();
                return dataToUpdate;
            }),
            mergeMap((dataMapped) => {
                return this.repository.update(keyToSearch, dataMapped);
            }),
            catchError((error: any) => {
                if ((error instanceof ValidatorException)) {
                    this.notificationUi.showError("Domain error...");
                }
                return throwError(() => error);
            })
        )
    }

}
