export class AccountNotAuthorizedException extends Error {
  public codeStatus: number = 404;

  constructor() {
    super("Account not authorized");
  }
}
