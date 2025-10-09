import {ApplicationOutHttpEntity} from "@infrastructure/adapters/out/http/application/application.out.http.entity";
import {ApplicationEntity} from "@domain/entities/application/application.entity";

export class ApplicationOutHttpMapper {

  toDomain(dataInfrastructure: ApplicationOutHttpEntity): ApplicationEntity {
    const entityDomain: ApplicationEntity = new ApplicationEntity();
    entityDomain.id = dataInfrastructure.id;
    // More properties...
    entityDomain.created_at = dataInfrastructure.created_at;
    entityDomain.updated_at = dataInfrastructure.updated_at;
    entityDomain.deleted_at = dataInfrastructure.deleted_at;
    return entityDomain;
  }

  toInfrastructure(dataDomain: ApplicationEntity): ApplicationOutHttpEntity {
    const entityInfrastructure: ApplicationOutHttpEntity = {
      id: dataDomain.id,
      // More properties...
      created_at: dataDomain.created_at,
      updated_at: dataDomain.updated_at,
      deleted_at: dataDomain.deleted_at,
    };
    return entityInfrastructure;
  }

}
