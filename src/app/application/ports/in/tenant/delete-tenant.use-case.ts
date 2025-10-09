import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {TenantRepositoryPort} from "@application/ports/out/tenant/tenant.repository.port";

@Injectable()
export class DeleteTenantUseCase {

  constructor(
    @Inject("TenantRepositoryPort")
    private readonly repository: TenantRepositoryPort,
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
