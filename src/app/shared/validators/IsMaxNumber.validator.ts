import {ValidatorException} from "../exceptions/validator.exception";

/**
 * Valida si un valor es un número doble (decimal).
 *
 * @param value - Valor a validar.
 * @param fieldName - Nombre del campo (para el mensaje de error).
 * @param contextException - Define el tipo de excepción a lanzar ('http' o 'microservice').
 */
export function IsMaxNumberValidator(
    value: any,
    fieldName: string,
    valueCondition: number
): void {

    // 1️⃣ Validar que no esté vacío
    if (value === undefined || value === null || value === '') {
        const message = `${fieldName} es obligatorio.`;
        throw new ValidatorException(message, 404);
    }

    // 2️⃣ Validar que sea un número decimal válido
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        const message = `${fieldName} debe ser un número válido.`;
        throw new ValidatorException(message, 404);
    }

    if (value > valueCondition) {
        const message = `${fieldName} debe ser menor a ${valueCondition}.`;
        throw new ValidatorException(message, 404);
    }

}
