import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class CreateAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
  ) {
  }

  public execute(dataToCreate: AccountEntity): Observable<AccountEntity> {
    return of(dataToCreate).pipe(
      tap(dataConverted => {
        const accountLogin: AccountEntity = Object.assign(new AccountEntity(), dataConverted);
        accountLogin.validateToCreate();
        return dataConverted;
      }),
      mergeMap((dataMapped) => {
        return this.repository.create(dataMapped);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    )
  }

}
