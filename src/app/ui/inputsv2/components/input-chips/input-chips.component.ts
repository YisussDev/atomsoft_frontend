import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputChipsComponent),
      multi: true
    }
  ]
})
export class InputChipsComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string = '';
  @Input() id: string = `chips-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() placeholder: string = 'Agregar item...';
  @Input() hint: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() control?: FormControl;
  @Input() separator: string = ','; // Separador para agregar múltiples chips

  chips: string[] = [];
  inputValue: string = '';
  touched: boolean = false;

  ngOnInit() {
    if (this.control && this.control.value) {
      this.chips = this.control.value;
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  private onChange: (value: string[]) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  get showError(): boolean {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }

  get errorMessage(): string {
    if (this.control?.hasError('required') || this.control?.hasError('requiredArray')) {
      return 'Este campo es requerido';
    }
    if (this.control?.hasError('minLength')) {
      const minLength = this.control.errors?.['minLength']?.requiredLength;
      return `Debe agregar al menos ${minLength} items`;
    }
    if (this.control?.hasError('maxLength')) {
      const maxLength = this.control.errors?.['maxLength']?.requiredLength;
      return `No puede agregar más de ${maxLength} items`;
    }
    return 'Error de validación';
  }

  get inputClasses(): string {
    const baseClasses = 'block w-full rounded-lg border transition-all duration-200 text-btw bg-btw-secondary';
    const paddingClasses = this.icon ? 'pl-10 pr-10 py-2.5' : 'px-4 py-2.5';
    const stateClasses = this.showError
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : this.control?.valid && this.control?.dirty
        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
        : 'border-gray-300 focus:ring-btw focus:border-btw';
    const disabledClasses = this.disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : '';

    return `${baseClasses} ${paddingClasses} ${stateClasses} ${disabledClasses}`;
  }

  writeValue(value: string[]): void {
    this.chips = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === this.separator) {
      event.preventDefault();
      this.addChip();
    } else if (event.key === 'Backspace' && !this.inputValue && this.chips.length > 0) {
      this.removeChip(this.chips.length - 1);
    }
  }

  onInputBlur(): void {
    this.markAsTouched();
    if (this.inputValue.trim()) {
      this.addChip();
    }
  }

  addChip(): void {
    const value = this.inputValue.trim();
    if (value && !this.chips.includes(value)) {
      this.chips.push(value);
      this.inputValue = '';
      this.updateValue();
    }
  }

  removeChip(index: number): void {
    this.chips.splice(index, 1);
    this.updateValue();
  }

  private updateValue(): void {
    this.onChange(this.chips);
    if (this.control) {
      this.control.setValue([...this.chips]);
      this.control.markAsDirty();
      this.control.updateValueAndValidity();
    }
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
      if (this.control) {
        this.control.markAsTouched();
      }
    }
  }
}
