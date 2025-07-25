export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string,
): void {
  if (!value || value.length < minLength) {
    const messageErrorResponse = `${fieldName} debe tener al menos ${minLength} caracteres`;
    throw new Error(messageErrorResponse);
  }
}

export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string,
): void {
  if (value && value.length > maxLength) {
    const messageErrorResponse = `${fieldName} no debe tener más de ${maxLength} caracteres`;
    throw new Error(messageErrorResponse);
  }
}
