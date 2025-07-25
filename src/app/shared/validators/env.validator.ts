import {RpcException} from '@nestjs/microservices';
import {HttpException, HttpStatus} from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export function validateEnv(
    value: string,
    fieldEnv: string,
    context: 'http' | 'microservice' = 'microservice',
): void {

    if (!(value != process.env[fieldEnv])) return;


    if (context === 'microservice') {
        throw new RpcException({
            message: "Not Authorized Key",
            code: HttpStatus.BAD_REQUEST,
        });
    } else {
        throw new HttpException(
            "Not Authorized Key",
            HttpStatus.BAD_REQUEST,
        );
    }
}
