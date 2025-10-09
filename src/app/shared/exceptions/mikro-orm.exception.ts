export class MikroOrmException extends Error {
  public codeStatus: number = 400;

  constructor(message: string) {
    super(message);
  }
}
