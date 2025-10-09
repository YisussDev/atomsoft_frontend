import {ValidatorException} from "../exceptions/validator.exception";

/**
 * Valida si un valor es un número doble (decimal).
 *
 * @param value - Valor a validar.
 * @param fieldName - Nombre del campo (para el mensaje de error).
 * @param contextException - Define el tipo de excepción a lanzar ('http' o 'microservice').
 */
export function IsRequiredValidator(
    value: any,
    fieldName: string
): void {
    if (value === undefined || value === null || value === '') {
        const message = `${fieldName} es obligatorio.`;
        throw new ValidatorException(message, 404);
    }
}