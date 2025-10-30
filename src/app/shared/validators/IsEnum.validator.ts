import {ValidatorException} from "../exceptions/validator.exception";

export function IsEnumValidator(
  value: any,
  fieldName: string,
  allowedValues?: string[],
): void {
  if (!allowedValues) throw new ValidatorException(`Not allowed values to ${fieldName}.`, 404);
  if (!allowedValues.includes(value)) {
    const messageErrorResponse = `${fieldName} debe ser uno de: ${allowedValues.join(', ')}`;
    throw new ValidatorException(messageErrorResponse, 404);
  }
}
