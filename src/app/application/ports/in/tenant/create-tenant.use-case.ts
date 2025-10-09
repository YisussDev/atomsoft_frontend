import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ValidatorException} from "@shared/exceptions/validator.exception";
import {NotificationUi} from "@infrastructure/ui/services/notification/notification.ui";

import {TenantEntity} from "@domain/entities/tenant/tenant.entity";
import {TenantRepositoryPort} from "@application/ports/out/tenant/tenant.repository.port";

@Injectable()
export class CreateTenantUseCase {

    constructor(
        @Inject("TenantRepositoryPort")
        private readonly repository: TenantRepositoryPort,
        private notificationUi: NotificationUi
    ) {
    }

    public execute(dataToCreate: TenantEntity): Observable<TenantEntity> {
        return of(dataToCreate).pipe(
            tap(dataTap => {
                const instanceDomain: TenantEntity = Object.assign(new TenantEntity(), dataTap);
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
