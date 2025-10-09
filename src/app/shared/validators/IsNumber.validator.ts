import {ThrowException} from "../exceptions/throw.exception";

/**
 * Valida si un valor es un número doble (decimal).
 *
 * @param value - Valor a validar.
 * @param fieldName - Nombre del campo (para el mensaje de error).
 * @param contextException - Define el tipo de excepción a lanzar ('http' o 'microservice').
 */
export function IsNumberValidator(
    value: any,
    fieldName: string,
    contextException: 'http' | 'microservice' = 'http',
): void {
    // 1️⃣ Validar que no esté vacío
    if (value === undefined || value === null || value === '') {
        const message = `${fieldName} es obligatorio.`;
        ThrowException(contextException, message);
    }

    // 2️⃣ Validar que sea un número decimal válido
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        const message = `${fieldName} debe ser un número válido.`;
        ThrowException(contextException, message);
    }
}
