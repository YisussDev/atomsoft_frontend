export class ValidatorException extends Error {

    public codeStatus!: number;

    constructor(message: string, codeStatus: number = 400) {
        super(message);
        this.message = message;
        this.codeStatus = codeStatus || 404;
    }
}