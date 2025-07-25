import {RpcException} from "@nestjs/microservices";
import {HttpException, HttpStatus} from "@nestjs/common";

export function requiredValidator(
    value: string,
    fieldName: string,
    context: 'http' | 'microservice' = 'microservice',
): boolean {
    if (!value) {
        const messageErrorResponse = `${fieldName} es obligatorio.`;
        if (context === 'microservice') {
            throw new RpcException({message: messageErrorResponse, codeStatus: HttpStatus.BAD_REQUEST});
        } else {
            throw new HttpException(messageErrorResponse, HttpStatus.BAD_REQUEST);
        }
    } else {
        return true;
    }
}