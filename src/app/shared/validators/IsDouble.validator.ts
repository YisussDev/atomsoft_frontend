import {ThrowException} from "../exceptions/throw.exception";
import {ValidatorException} from "@shared/exceptions/validator.exception";

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
): void {
  // 1️⃣ Validar que no esté vacío
  if (value === undefined || value === null || value === '') {
    const message = `${fieldName} es obligatorio.`;
    throw new ValidatorException(message);
  }

  // 2️⃣ Validar que sea un número decimal válido
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    const message = `${fieldName} debe ser un número válido.`;
    throw new ValidatorException(message);
  }

  // 3️⃣ Validar que sea un número con decimales
  if (!/\d+\.\d+/.test(String(value))) {
    const message = `${fieldName} debe ser un número decimal (por ejemplo: 10.5).`;
    throw new ValidatorException(message);
  }
}
