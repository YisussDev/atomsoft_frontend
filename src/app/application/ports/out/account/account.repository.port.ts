import {AccountEntity} from "@domain/entities/account/account.entity";
import {Observable} from "rxjs";
import {SessionEntity} from "@domain/entities/account/session.entity";

export interface AccountRepositoryPort {
  findAll(
    query: { [T: string]: any }
  ): Observable<{
    data: AccountEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }>;

  findOne(
    query: { [key: string]: string | number },
  ): Observable<{ data: AccountEntity | null }>;

  create(
    dataToCreate: AccountEntity,
  ): Observable<{ token: string; is_two_factor: 0 | 1 }>;

  update(
    keyToSearch: string,
    dataToUpdate: Partial<AccountEntity>,
  ): Observable<{ data: AccountEntity }>;

  delete(
    keyToDelete: string,
  ): Observable<void>;

}
