import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {HttpService} from "@core/services/http/http.service";

import {environment} from "../../../../../../environments/environment";

import {ApplicationRepositoryPort} from "@application/ports/out/application/application.repository.port";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {ApplicationOutHttpEntity} from "@infrastructure/adapters/out/http/application/application.out.http.entity";
import {ApplicationOutHttpMapper} from "@infrastructure/adapters/out/http/application/application.out.http.mapper";
import {HttpHeaders} from "@angular/common/http";
import {objectToQueryParams} from "@shared/helpers/object-to-query-params";

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
    const queryTransform = objectToQueryParams(query);
    return this.httpService.get<{
      data: ApplicationOutHttpEntity[];
      pageActual?: number;
      limitActual?: number;
      totalFounded?: number;
    }>(`${this.apiUrl}application${queryTransform}`).pipe(
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
    const queryTransform = objectToQueryParams(query);
    return this.httpService.get<{
      data: ApplicationEntity | null;
    }>(`${this.apiUrl}application/one${queryTransform}`).pipe(
      map((response) => {
        console.log(response)
        return {
          data: response.data ? (this.mapper.toDomain(response.data)) : null,
        }
      })
    );
  }

  public create(dataToCreate: ApplicationEntity): Observable<ApplicationEntity> {
    const formData: FormData = new FormData();

    // Claves cuyos valores deben ser convertidos a JSON
    const keysToStringify: (keyof ApplicationEntity)[] = ['chips', 'img_chips', 'plans'];

    (Object.keys(dataToCreate) as (keyof ApplicationEntity)[]).forEach((key) => {
      const value = dataToCreate[key];

      if (value === undefined || value === null) return; // Evita campos vacíos

      // Si la clave está en la lista, convertir el valor a JSON string
      if (keysToStringify.includes(key)) {
        formData.append(key as string, JSON.stringify(value));
      } else if (value instanceof File || value instanceof Blob) {
        // Soporte para archivos o blobs
        formData.append(key as string, value);
      } else {
        // Asegura que siempre se agregue como string
        formData.append(key as string, String(value));
      }
    });

    return this.httpService.post<ApplicationEntity, FormData>(`${this.apiUrl}application`, formData);
  }

  public update(
    keyToSearch: string,
    dataToUpdate: ApplicationEntity
  ): Observable<{ data: ApplicationEntity }> {
    const formData: FormData = new FormData();

    // Claves cuyos valores deben ser convertidos a JSON
    const keysToStringify: (keyof ApplicationEntity)[] = ['chips', 'img_chips', 'plans'];

    (Object.keys(dataToUpdate) as (keyof ApplicationEntity)[]).forEach((key) => {
      const value = dataToUpdate[key];

      if (value === undefined || value === null) return; // Evita campos vacíos

      // Si la clave está en la lista, convertir el valor a JSON string
      if (keysToStringify.includes(key)) {
        formData.append(key as string, JSON.stringify(value));
      } else if (value instanceof File || value instanceof Blob) {
        // Soporte para archivos o blobs
        formData.append(key as string, value);
      } else {
        // Asegura que siempre se agregue como string
        formData.append(key as string, String(value));
      }
    });

    return this.httpService.patch<{
      data: ApplicationEntity
    }, FormData>(`${this.apiUrl}application/update?id=${keyToSearch}`, formData);
  }

  public delete(
    keyToDelete: string
  ): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}application/${keyToDelete}`);
  }

}
