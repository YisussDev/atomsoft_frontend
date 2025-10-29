import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {HttpService} from "@core/services/http/http.service";

import {environment} from "../../../../../../environments/environment";

import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationOutHttpEntity} from "@infrastructure/adapters/out/http/application/application.out.http.entity";
import {ApplicationOutHttpMapper} from "@infrastructure/adapters/out/http/application/application.out.http.mapper";
import {HttpHeaders} from "@angular/common/http";

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
    const headers: HttpHeaders = new HttpHeaders({
      // "Content-Type": "multipart/form-data",
    })
    const formData: FormData = new FormData();
    for (let dataToCreateKey of Object.keys(dataToCreate)) {
      // @ts-ignore
      formData.append(dataToCreateKey, dataToCreate[dataToCreateKey]);
    }
    return this.httpService.post<ApplicationEntity, FormData>(`${this.apiUrl}application`, formData, {headers});
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
