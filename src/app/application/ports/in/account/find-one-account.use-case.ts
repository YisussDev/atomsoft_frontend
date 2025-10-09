import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class FindOneAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: AccountEntity | null }> {
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
