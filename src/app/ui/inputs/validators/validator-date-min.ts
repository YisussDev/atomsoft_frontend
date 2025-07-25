import {AbstractControl, ValidatorFn} from "@angular/forms";
import * as moment from 'moment';

export function validatorDateMin(yearToCompare: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    let yearControl = moment(control.value);
    let yearMin = moment(yearToCompare);

    if (moment(yearControl).isBefore(yearMin)) {
      return {'validatorDateMin': yearMin.format('YYYY-MM-DD')};
    } else {
      return null;
    }
  }
}
