import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";

@Injectable()
export class FindAllApplicationUseCase {

  constructor(
    @Inject("ApplicationRepositoryPort")
    private readonly repository: ApplicationRepositoryPort,
  ) {
  }

  public execute(query: { [key: string]: string | number }): Observable<{ data: ApplicationEntity[] }> {
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
