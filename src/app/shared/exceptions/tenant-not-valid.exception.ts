export class TenantNotValidException extends Error {
  public codeStatus: number = 404;

  constructor() {
    super("Tenant not valid");
  }
}
