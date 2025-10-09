import {ThrowException} from "../exceptions/throw.exception";

/**
 * Valida si un valor es un número doble (decimal).
 *
 * @param value - Valor a validar.
 * @param fieldName - Nombre del campo (para el mensaje de error).
 * @param contextException - Define el tipo de excepción a lanzar ('http' o 'microservice').
 */
export function IsDoubleValidator(
    value: any,
    fieldName: string,
    contextException: 'http' | 'microservice' = 'http',
): void {
    // 1️⃣ Validar que no esté vacío
    if (value === undefined || value === null || value === '') {
        const message = `${fieldName} es obligatorio.`;
        ThrowException(contextException, message, 404);
    }

    // 2️⃣ Validar que sea un número decimal válido
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        const message = `${fieldName} debe ser un número válido.`;
        ThrowException(contextException, message, 404);
    }

    // 3️⃣ Validar que sea un número con decimales
    if (!/\d+\.\d+/.test(String(value))) {
        const message = `${fieldName} debe ser un número decimal (por ejemplo: 10.5).`;
        ThrowException(contextException, message, 404);
    }
}
