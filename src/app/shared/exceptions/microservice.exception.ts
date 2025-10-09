export class MicroserviceException extends Error {
  public codeStatus: number = 400;

  constructor(message: string) {
    super(`Error microservice Exception: ${message}}`);
  }
}
