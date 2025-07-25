export const dictionaryEn = {
  required: {
    expressable: false,
    message: 'This field is required.',
  },
  min: {
    expressable: true,
    message: 'The field must have a minimum value of',
  },
  max: {
    expressable: true,
    message: 'The field must have a maximum value of',
  },
  minlength: {
    expressable: true,
    message: 'The field must have a minimum length of',
  },
  maxlength: {
    expressable: true,
    message: 'The field must have a maximum length of',
  },
  validatorEmail: {
    expressable: false,
    message: 'This is not a valid email.',
  },
  validatorUniversalMinlength: {
    expressable: true,
    message: 'The field must have a minimum length of',
  },
  validatorUniversalMaxlength: {
    expressable: true,
    message: 'The field must have a maximum length of',
  },
  validatorDate: {
    expressable: false,
    message: 'The field must contain a valid date.',
  },
  documentInvalid: {
    expressable: false,
    message: 'The field must contain a valid and available document.',
  },
  validatorPassword: {
    expressable: false,
    message: 'At least one special character and one uppercase letter required.',
  },
  validatorNotEqual: {
    expressable: false,
    message: 'The fields do not match.',
  },
  validatorComparateDate: {
    expressable: false,
    message: 'The dates do not match.',
  },
  validatorDateMin: {
    expressable: true,
    message: 'The minimum date must be',
  },
  validatorNumber: {
    expressable: false,
    message: 'Only numbers are allowed.',
  }
}
