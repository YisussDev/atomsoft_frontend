import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpService} from "@core/services/http/http.service";

import {environment} from "../../../../../../environments/environment";

import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationOutHttpEntity} from "@infrastructure/adapters/out/http/application/application.out.http.entity";
import {ApplicationOutHttpMapper} from "@infrastructure/adapters/out/http/application/application.out.http.mapper";

@Injectable()
export class ApplicationOutHttpRepository implements ApplicationRepositoryPort {

  public readonly apiUrl = environment.uri;

  public mapper: ApplicationOutHttpMapper = new ApplicationOutHttpMapper();


  constructor(
    private httpService: HttpService
  ) {
  }

  public findAll(
    query: { [p: string]: any },
  ): Observable<{
    data: ApplicationEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }> {
    return this.httpService.get<{
      data: ApplicationOutHttpEntity[];
      pageActual?: number;
      limitActual?: number;
      totalFounded?: number;
    }>(`${this.apiUrl}application`).pipe(
      map((response) => {
        const dataMapped: ApplicationEntity[] = response.data.map(itemInfra => {
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
  ): Observable<{ data: ApplicationEntity | null }> {
    return this.httpService.get<{
      data: ApplicationEntity | null;
    }>(`${this.apiUrl}application`).pipe(
      map((response) => {
        return {
          data: response.data ? (this.mapper.toDomain(response.data)) : null,
        }
      })
    );
  }

  public create(
    dataToCreate: ApplicationEntity
  ): Observable<ApplicationEntity> {
    return this.httpService.post<ApplicationEntity, ApplicationEntity>(`${this.apiUrl}application`, dataToCreate);
  }

  public update(
    keyToSearch: string,
    dataToUpdate: ApplicationEntity
  ): Observable<{ data: ApplicationEntity }> {
    return this.httpService.patch<{
      data: ApplicationEntity
    }, ApplicationEntity>(`${this.apiUrl}application/${keyToSearch}`, dataToUpdate);
  }

  public delete(
    keyToDelete: string
  ): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}application/${keyToDelete}`);
  }

}
