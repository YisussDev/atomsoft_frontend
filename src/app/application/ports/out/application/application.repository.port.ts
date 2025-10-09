import {Observable} from "rxjs";

import {ApplicationEntity} from "@domain/entities/application/application.entity";

export interface ApplicationRepositoryPort {
  findAll(
    query: { [T: string]: any }
  ): Observable<{
    data: ApplicationEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }>;

  findOne(
    query: { [key: string]: string | number },
  ): Observable<{ data: ApplicationEntity | null }>;

  create(
    dataToCreate: ApplicationEntity,
  ): Observable<ApplicationEntity>;

  update(
    keyToSearch: string,
    dataToUpdate: ApplicationEntity,
  ): Observable<{ data: ApplicationEntity }>;

  delete(
    keyToDelete: string,
  ): Observable<void>;

}
