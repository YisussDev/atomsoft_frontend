import {Observable} from "rxjs";

import {TenantEntity} from "@domain/entities/tenant/tenant.entity";

export interface TenantRepositoryPort {
  findAll(
    query: { [T: string]: any }
  ): Observable<{
    data: TenantEntity[];
    pageActual?: number;
    limitActual?: number;
    totalFounded?: number;
  }>;

  findOne(
    query: { [key: string]: string | number },
  ): Observable<{ data: TenantEntity | null }>;

  create(
    dataToCreate: TenantEntity,
  ): Observable<TenantEntity>;

  update(
    keyToSearch: string,
    dataToUpdate: TenantEntity,
  ): Observable<{ data: TenantEntity }>;

  delete(
    keyToDelete: string,
  ): Observable<void>;

}
