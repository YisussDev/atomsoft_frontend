import {Injectable} from "@angular/core";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {map, Observable} from "rxjs";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {environment} from "../../../../../../environments/environment";
import {HttpService} from "@core/services/http/http.service";
import {AccountOutHttpEntity} from "@infrastructure/adapters/out/http/account/account.out.http.entity";
import {AccountOutHttpMapper} from "@infrastructure/adapters/out/http/account/account.out.http.mapper";
import {objectToQueryParams} from "@shared/helpers/object-to-query-params";

@Injectable()
export class AccountOutHttpRepository implements AccountRepositoryPort {

  public readonly apiUrl = environment.uri;

  public mapper: AccountOutHttpMapper = new AccountOutHttpMapper();


  constructor(
    private httpService: HttpService
  ) {
  }

  public findAll(
    query: { [p: string]: string | number },
  ): Observable<{
    data: AccountEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }> {
    const queryTransform = objectToQueryParams(query);
    return this.httpService.get<{
      data: AccountOutHttpEntity[];
      pageActual?: number;
      limitActual?: number;
      totalFounded?: number;
    }>(`${this.apiUrl}account${queryTransform}`).pipe(
      map((response) => {
        const dataMapped: AccountEntity[] = response.data.map(itemInfra => {
          return this.mapper.toDomain(itemInfra);
        });
        return {
          data: dataMapped,
          pageActual: response.pageActual,
          limitActual: response.limitActual,
          totalFounded: response.totalFounded,
        }
      })
    );
  }

  public findOne(
    query: { [p: string]: string },
  ): Observable<{ data: AccountEntity | null }> {
    return this.httpService.get<{
      data: AccountEntity | null;
    }>(`${this.apiUrl}account`).pipe(
      map((response) => {
        return {
          data: response.data ? (this.mapper.toDomain(response.data)) : null,
        }
      })
    );
  }

  public create(
    dataToCreate: AccountEntity
  ): Observable<{ token: string; is_two_factor: 0 | 1 }> {
    return this.httpService.post<{
      token: string;
      is_two_factor: 0 | 1
    }, AccountEntity>(`${this.apiUrl}account/register`, dataToCreate);
  }

  public update(
    keyToSearch: string,
    dataToUpdate: AccountEntity
  ): Observable<{ data: AccountEntity }> {
    return this.httpService.patch<{
      data: AccountEntity
    }, AccountEntity>(`${this.apiUrl}account/${keyToSearch}`, dataToUpdate);
  }

  public delete(
    keyToDelete: string
  ): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}account/${keyToDelete}`);
  }

}
