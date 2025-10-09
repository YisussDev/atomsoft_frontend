import { RpcException } from "@nestjs/microservices";
import { HttpStatus } from "@nestjs/common";

export class NotPropertyFoundException extends Error {
  public codeStatus: number = 404;

  constructor(className: string, property: string, codeStatus: number) {
    super(`${className} not has property ${property}`);
    this.codeStatus = codeStatus;
  }
}
