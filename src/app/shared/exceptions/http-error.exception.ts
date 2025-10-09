import {HttpException} from "@nestjs/common";

export class HttpErrorException extends HttpException {
    constructor(message: string, codeStatus: number) {
        super(message, codeStatus);
    }
}