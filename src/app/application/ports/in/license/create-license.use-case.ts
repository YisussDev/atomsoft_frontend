import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {LicenseEntity} from "@domain/entities/license/license.entity";
import {LicenseRepositoryPort} from "@application/ports/out/license/license.repository.port";

@Injectable()
export class CreateLicenseUseCase {

    constructor(
        @Inject("LicenseRepositoryPort")
        private readonly repository: LicenseRepositoryPort,
        private notificationUi: NotificationUi
    ) {
    }

    public execute(dataToCreate: LicenseEntity): Observable<LicenseEntity> {
        return of(dataToCreate).pipe(
            tap(dataTap => {
                const instanceDomain: LicenseEntity = Object.assign(new LicenseEntity(), dataTap);
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
