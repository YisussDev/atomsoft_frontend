import {MicroserviceErrorException} from "./microservice-error.exception";
import {HttpErrorException} from "./http-error.exception";

export function ThrowException(
    contextException: 'http' | 'microservice',
    message: string,
    codeStatus: number = 500,
): never {
    if (contextException === 'microservice') {
        throw new MicroserviceErrorException(message, codeStatus);
    } else {
        throw new HttpErrorException(message, codeStatus);
    }
}