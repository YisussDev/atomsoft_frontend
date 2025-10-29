import {DomainError} from "@shared/exceptions/domain.exception";

export function validatePassword(
  value: string,
  fieldName: string
): void {
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  let messageErrorResponse = '';

  if (!value) {
    messageErrorResponse = `${fieldName} es obligatoria.`;
  } else if (value.length < minLength) {
    messageErrorResponse = `${fieldName} debe tener al menos ${minLength} caracteres.`;
  } else if (!uppercaseRegex.test(value)) {
    messageErrorResponse = `${fieldName} debe contener al menos una letra mayúscula.`;
  } else if (!numberRegex.test(value)) {
    messageErrorResponse = `${fieldName} debe contener al menos un número.`;
  } else if (!specialCharRegex.test(value)) {
    messageErrorResponse = `${fieldName} debe contener al menos un carácter especial.`;
  }

  if (messageErrorResponse) {
    throw new DomainError(messageErrorResponse)
  }
}
