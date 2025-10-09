import {Inject, Injectable} from "@angular/core";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {TenantEntity} from "@domain/entities/tenant/tenant.entity";
import {TenantRepositoryPort} from "@application/ports/out/tenant/tenant.repository.port";

@Injectable()
export class UpdateTenantUseCase {

    constructor(
        @Inject("TenantRepositoryPort")
        private readonly repository: TenantRepositoryPort,
        private notificationUi: NotificationUi
    ) {
    }

    public execute(keyToSearch: string, dataToUpdate: TenantEntity): Observable<{ data: TenantEntity }> {
        return of(dataToUpdate).pipe(
            map(dataToUpdate => {
                const instanceDomain: TenantEntity = Object.assign(new TenantEntity(), dataToUpdate);
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
