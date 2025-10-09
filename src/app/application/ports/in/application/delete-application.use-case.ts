import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";

@Injectable()
export class DeleteApplicationUseCase {

    constructor(
        @Inject("ApplicationRepositoryPort")
        private readonly repository: ApplicationRepositoryPort,
    ) {
    }

    public execute(keyToDelete: string): Observable<void> {
        return of().pipe(
            mergeMap(() => {
                return this.repository.delete(keyToDelete);
            }),
            catchError((error: any) => {
                return throwError(() => error);
            })
        )
    }

}
