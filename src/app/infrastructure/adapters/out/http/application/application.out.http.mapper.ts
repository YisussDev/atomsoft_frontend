import {ApplicationOutHttpEntity} from "@infrastructure/adapters/out/http/application/application.out.http.entity";
import {ApplicationEntity} from "@domain/entities/application/application.entity";

export class ApplicationOutHttpMapper {

  toDomain(dataInfrastructure: ApplicationOutHttpEntity): ApplicationEntity {
    const entityDomain: ApplicationEntity = new ApplicationEntity();
    entityDomain.id = dataInfrastructure.id;
    // More properties...
    entityDomain.code = dataInfrastructure.code;
    entityDomain.name = dataInfrastructure.name;
    entityDomain.logo_url = dataInfrastructure.logo_url;
    entityDomain.description = dataInfrastructure.description;
    entityDomain.chips = dataInfrastructure.chips;
    entityDomain.price = dataInfrastructure.price;
    entityDomain.url_production = dataInfrastructure.url_production;
    entityDomain.url_sandbox = dataInfrastructure.url_sandbox;
    entityDomain.url_test = dataInfrastructure.url_test;
    entityDomain.url_front_production = dataInfrastructure.url_front_production;
    entityDomain.url_front_sandbox = dataInfrastructure.url_front_sandbox;
    entityDomain.url_front_test = dataInfrastructure.url_front_test;
    entityDomain.recursive_payment = dataInfrastructure.recursive_payment;
    // Base...
    entityDomain.created_at = dataInfrastructure.created_at;
    entityDomain.updated_at = dataInfrastructure.updated_at;
    entityDomain.deleted_at = dataInfrastructure.deleted_at;
    return entityDomain;
  }

  toInfrastructure(dataDomain: ApplicationEntity): ApplicationOutHttpEntity {
    const entityInfrastructure: ApplicationOutHttpEntity = {
      id: dataDomain.id,
      // More properties...
      code: dataDomain.code,
      name: dataDomain.name,
      logo_url: dataDomain.logo_url,
      description: dataDomain.description,
      chips: dataDomain.chips,
      price: dataDomain.price,
      url_production: dataDomain.url_production,
      url_sandbox: dataDomain.url_sandbox,
      url_test: dataDomain.url_test,
      url_front_production: dataDomain.url_front_production,
      url_front_sandbox: dataDomain.url_front_sandbox,
      url_front_test: dataDomain.url_front_test,
      recursive_payment: dataDomain.recursive_payment,
      // Base...
      created_at: dataDomain.created_at,
      updated_at: dataDomain.updated_at,
      deleted_at: dataDomain.deleted_at,
    };
    return entityInfrastructure;
  }

}
