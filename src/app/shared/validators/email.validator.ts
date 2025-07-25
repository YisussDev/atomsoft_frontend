export function validateEmail(
  value: string,
  fieldName: string,
): void {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let messageErrorResponse = '';

  if (!value) {
    messageErrorResponse = `${fieldName} es obligatorio.`;
  } else if (value.length < 5) {
    messageErrorResponse = `${fieldName} debe tener al menos 5 caracteres.`;
  } else if (!emailRegex.test(value)) {
    messageErrorResponse = `${fieldName} no tiene un formato válido.`;
  }
  if (messageErrorResponse) {
    throw new Error(messageErrorResponse);
  }
}
