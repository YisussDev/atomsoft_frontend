import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() hint: string = '';
  @Input() icon?: string;
  @Input() disabled: boolean = false;
  @Input() errorMessages: { [key: string]: string } = {
    required: 'Este campo es requerido',
    email: 'Ingrese un email válido',
    minlength: 'Longitud mínima no alcanzada',
    maxlength: 'Longitud máxima excedida',
    min: 'Valor mínimo no alcanzado',
    max: 'Valor máximo excedido',
    pattern: 'Formato inválido'
  };

  value: any = '';

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onBlur(): void {
    this.onTouched();
  }

  get showError(): boolean {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }

  get errorMessage(): string {
    if (!this.control?.errors) return '';

    const errorKey = Object.keys(this.control.errors)[0];
    const error = this.control.errors[errorKey];

    if (this.errorMessages[errorKey]) {
      let message = this.errorMessages[errorKey];

      if (errorKey === 'minlength') {
        message = `Mínimo ${error.requiredLength} caracteres`;
      } else if (errorKey === 'maxlength') {
        message = `Máximo ${error.requiredLength} caracteres`;
      } else if (errorKey === 'min') {
        message = `Valor mínimo: ${error.min}`;
      } else if (errorKey === 'max') {
        message = `Valor máximo: ${error.max}`;
      }

      return message;
    }

    return 'Campo inválido';
  }

  get inputClasses(): string {
    const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400';
    const iconPadding = this.icon ? 'pl-11' : '';

    if (this.showError) {
      return `${baseClasses} ${iconPadding} border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100 bg-red-50`;
    }

    if (this.disabled) {
      return `${baseClasses} ${iconPadding} border-gray-200 bg-gray-100 cursor-not-allowed`;
    }

    return `${baseClasses} ${iconPadding} border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-400`;
  }
}
