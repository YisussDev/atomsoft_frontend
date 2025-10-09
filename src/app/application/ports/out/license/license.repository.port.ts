import {Observable} from "rxjs";

import {LicenseEntity} from "@domain/entities/license/license.entity";

export interface LicenseRepositoryPort {
  findAll(
    query: { [T: string]: any }
  ): Observable<{
    data: LicenseEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }>;

  findOne(
    query: { [key: string]: string | number },
  ): Observable<{ data: LicenseEntity | null }>;

  create(
    dataToCreate: LicenseEntity,
  ): Observable<LicenseEntity>;

  update(
    keyToSearch: string,
    dataToUpdate: LicenseEntity,
  ): Observable<{ data: LicenseEntity }>;

  delete(
    keyToDelete: string,
  ): Observable<void>;

}
