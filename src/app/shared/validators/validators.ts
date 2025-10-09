import {IsRequiredValidator} from "./IsRequired.validator";
import {IsDoubleValidator} from "./IsDouble.validator";
import {IsNumberValidator} from "./IsNumber.validator";
import {IsStringValidator} from "./IsString.validator";
import {IsEnumValidator} from "./IsEnum.validator";
import {IsMinLengthValidator} from "./IsMinLength.validator";
import {IsMaxLengthValidator} from "./IsMaxLength.validator";
import {IsMinNumberValidator} from "./IsMinNumber.validator";
import {IsMaxNumberValidator} from "./IsMaxNumber.validator";

export class Validators {

    public isRequired(value: number | string, fieldName: string): void {
        IsRequiredValidator(value, fieldName);
    }

    public isString(value: string, fieldName: string): void {
        IsStringValidator(value, fieldName);
    }

    public isNumber(value: number, fieldName: string): void {
        IsNumberValidator(value, fieldName);
    }

    public isEnum(value: string, fieldName: string, allowedValues: string[]): void {
        IsEnumValidator(value, fieldName, allowedValues);
    }

    public isDouble(value: number, fieldName: string): void {
        IsDoubleValidator(value, fieldName);
    }

    public isMinLength(value: string, fieldName: string, valueCondition: number): void {
        IsMinLengthValidator(value, fieldName, valueCondition);
    }

    public isMaxLength(value: string, fieldName: string, valueCondition: number): void {
        IsMaxLengthValidator(value, fieldName, valueCondition);
    }

    public isMinNumber(value: number, fieldName: string, valueCondition: number): void {
        IsMinNumberValidator(value, fieldName, valueCondition);
    }

    public isMaxNumber(value: number, fieldName: string, valueCondition: number): void {
        IsMaxNumberValidator(value, fieldName, valueCondition);
    }

}