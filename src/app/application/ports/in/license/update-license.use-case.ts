import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {LicenseEntity} from "@domain/entities/license/license.entity";
import {LicenseRepositoryPort} from "@application/ports/out/license/license.repository.port";

@Injectable()
export class UpdateLicenseUseCase {

    constructor(
        @Inject("LicenseRepositoryPort")
        private readonly repository: LicenseRepositoryPort,
        private notificationUi: NotificationUi
    ) {
    }

    public execute(keyToSearch: string, dataToUpdate: LicenseEntity): Observable<{ data: LicenseEntity }> {
        return of(dataToUpdate).pipe(
            map(dataToUpdate => {
                const instanceDomain: LicenseEntity = Object.assign(new LicenseEntity(), dataToUpdate);
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
