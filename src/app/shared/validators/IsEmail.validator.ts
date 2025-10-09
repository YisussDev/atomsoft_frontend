import {ThrowException} from "../exceptions/throw.exception";

/**
 * Valida si un valor es un número doble (decimal).
 *
 * @param value - Valor a validar.
 * @param fieldName - Nombre del campo (para el mensaje de error).
 * @param contextException - Define el tipo de excepción a lanzar ('http' o 'microservice').
 */
export function IsEmailValidator(
    value: any,
    fieldName: string,
    valueCondition: number,
    contextException: 'http' | 'microservice' = 'http',
): void {

    // 1️⃣ Validar que no esté vacío
    if (value === undefined || value === null || value === '') {
        const message = `${fieldName} es obligatorio.`;
        ThrowException(contextException, message, 404);
    }

    if ((typeof value) !== "string") {
        const message = `${fieldName} debe ser un string válido.`;
        ThrowException(contextException, message, 404);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let messageErrorResponse = '';

    if (!value) {
        messageErrorResponse = `${fieldName} es obligatorio.`;
    } else if (value.length < 5) {
        messageErrorResponse = `${fieldName} debe tener al menos 5 caracteres.`;
    } else if (!emailRegex.test(value)) {
        messageErrorResponse = `${fieldName} no tiene un formato válido.`;
    }

    if (messageErrorResponse) {
        const message = `${fieldName} debe ser un correo válido.`;
        ThrowException(contextException, message, 404);
    }
}
