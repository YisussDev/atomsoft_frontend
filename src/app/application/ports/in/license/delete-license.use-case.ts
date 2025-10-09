import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {LicenseRepositoryPort} from "@application/ports/out/license/license.repository.port";

@Injectable()
export class DeleteLicenseUseCase {

  constructor(
    @Inject("LicenseRepositoryPort")
    private readonly repository: LicenseRepositoryPort,
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
