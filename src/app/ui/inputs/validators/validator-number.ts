import {AbstractControl} from "@angular/forms";

export function validatorNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const regex = /^[0-9]+$/;
  if (!regex.test(control.value)) {
    return { 'validatorNumber': true };
  }

  return null;
}
