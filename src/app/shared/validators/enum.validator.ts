export function validateEnumValue<T>(
  value: T,
  allowedValues: readonly T[],
  fieldName: string,
): void {
  if (!allowedValues.includes(value)) {
    const allowedList = allowedValues.join(', ');
    const messageErrorResponse = `${fieldName} debe ser uno de los siguientes valores: ${allowedList}`;
    throw new Error(messageErrorResponse);
  }
}
