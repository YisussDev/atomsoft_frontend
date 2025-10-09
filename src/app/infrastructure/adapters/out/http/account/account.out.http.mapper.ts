import {AccountOutHttpEntity} from "@infrastructure/adapters/out/http/account/account.out.http.entity";
import {AccountEntity} from "@domain/entities/account/account.entity";

export class AccountOutHttpMapper {

  toDomain(dataInfrastructure: AccountOutHttpEntity): AccountEntity {
    const entityDomain: AccountEntity = new AccountEntity();
    entityDomain.id = dataInfrastructure.id;
    entityDomain.name = dataInfrastructure.name;
    entityDomain.username = dataInfrastructure.username;
    entityDomain.email = dataInfrastructure.email;
    entityDomain.password = dataInfrastructure.password;
    entityDomain.last_password = dataInfrastructure.last_password;
    entityDomain.tenant_code = dataInfrastructure.tenant_code;
    entityDomain.active = dataInfrastructure.active;
    entityDomain.two_factor_auth = dataInfrastructure.two_factor_auth;
    entityDomain.roles = dataInfrastructure.roles;
    entityDomain.permission = dataInfrastructure.permission;
    entityDomain.created_at = dataInfrastructure.created_at;
    entityDomain.updated_at = dataInfrastructure.updated_at;
    entityDomain.deleted_at = dataInfrastructure.deleted_at;
    return entityDomain;
  }

  toInfrastructure(dataDomain: AccountEntity): AccountOutHttpEntity {
    const entityInfrastructure: AccountOutHttpEntity = {
      id: dataDomain.id,
      name: dataDomain.name,
      username: dataDomain.username,
      email: dataDomain.email,
      password: dataDomain.password,
      last_password: dataDomain.last_password,
      tenant_code: dataDomain.tenant_code,
      active: dataDomain.active,
      two_factor_auth: dataDomain.two_factor_auth,
      roles: dataDomain.roles,
      permission: dataDomain.permission,
      created_at: dataDomain.created_at,
      updated_at: dataDomain.updated_at,
      deleted_at: dataDomain.deleted_at,
    };
    return entityInfrastructure;
  }

}
