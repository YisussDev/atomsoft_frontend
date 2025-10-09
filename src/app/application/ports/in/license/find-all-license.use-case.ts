import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {LicenseEntity} from "@domain/entities/license/license.entity";
import {LicenseRepositoryPort} from "@application/ports/out/license/license.repository.port";

@Injectable()
export class FindAllLicenseUseCase {

  constructor(
    @Inject("LicenseRepositoryPort")
    private readonly repository: LicenseRepositoryPort,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: LicenseEntity[] }> {
    return of(query).pipe(
      mergeMap(() => {
        return this.repository.findAll(query);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
