import {RpcException} from "@nestjs/microservices";

export class NotFoundException extends RpcException {
  constructor(entityName: string) {
    super({message: `${entityName} not found.`, codeStatus: 404});
  }
}
