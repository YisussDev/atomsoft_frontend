import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class DeleteAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
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
