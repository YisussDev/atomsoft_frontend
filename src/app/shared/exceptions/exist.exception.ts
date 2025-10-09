import {RpcException} from "@nestjs/microservices";

export class ExistException extends RpcException {
  constructor(entityName: string) {
    super({message: `${entityName} exist.`, codeStatus: 404});
  }
}
