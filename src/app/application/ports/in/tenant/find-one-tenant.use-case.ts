import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {TenantEntity} from "@domain/entities/tenant/tenant.entity";
import {TenantRepositoryPort} from "@application/ports/out/tenant/tenant.repository.port";

@Injectable()
export class FindOneTenantUseCase {

  constructor(
    @Inject("TenantRepositoryPort")
    private readonly repository: TenantRepositoryPort,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: TenantEntity | null }> {
    return of().pipe(
      mergeMap(() => {
        return this.repository.findOne(query);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
