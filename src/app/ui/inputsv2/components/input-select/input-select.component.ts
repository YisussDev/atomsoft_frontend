import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = `select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() options: SelectOption[] = [];
  @Input() control?: FormControl;
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  @Input() customErrorMessages?: { [key: string]: string };

  // Estilos personalizados
  @Input() selectClasses?: string;

  // Estados internos
  isOpen: boolean = false;
  searchTerm: string = '';
  filteredOptions: SelectOption[] = [];
  selectedValue: any = null;

  // Control interno
  private onChange: (value: any) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  ngOnInit(): void {
    this.filteredOptions = this.options;

    // Si hay un control, sincronizar el valor inicial
    if (this.control?.value !== null && this.control?.value !== undefined) {
      this.selectedValue = this.control.value;
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Select methods
  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.filteredOptions = this.options;
        this.searchTerm = '';
      }
    }
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      // Lógica para múltiple selección
      const currentValues = Array.isArray(this.selectedValue) ? this.selectedValue : [];
      const index = currentValues.indexOf(option.value);

      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }

      this.selectedValue = [...currentValues];
    } else {
      this.selectedValue = option.value;
      this.isOpen = false;
    }

    this.onChange(this.selectedValue);
    this.control?.setValue(this.selectedValue);
    this.control?.markAsTouched();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();

    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm)
    );
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.selectedValue = this.multiple ? [] : null;
    this.onChange(this.selectedValue);
    this.control?.setValue(this.selectedValue);
    this.control?.markAsTouched();
  }

  isSelected(option: SelectOption): boolean {
    if (this.multiple) {
      return Array.isArray(this.selectedValue) && this.selectedValue.includes(option.value);
    }
    return this.selectedValue === option.value;
  }

  getSelectedLabel(): string {
    if (this.multiple) {
      const selected = this.options.filter(opt => this.isSelected(opt));
      return selected.length > 0
        ? selected.map(opt => opt.label).join(', ')
        : this.placeholder;
    }

    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : this.placeholder;
  }

  onBlur(): void {
    this.onTouched();
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }

  get showError(): boolean {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }

  get errorMessage(): string {
    if (!this.control?.errors) return '';

    const errors = this.control.errors;

    // Mensajes personalizados
    if (this.customErrorMessages) {
      for (const key in errors) {
        if (this.customErrorMessages[key]) {
          return this.customErrorMessages[key];
        }
      }
    }

    // Mensajes por defecto
    if (errors['required']) return 'Este campo es requerido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return 'Formato inválido';
    if (errors['email']) return 'Email inválido';
    if (errors['min']) return `Valor mínimo: ${errors['min'].min}`;
    if (errors['max']) return `Valor máximo: ${errors['max'].max}`;

    return 'Campo inválido';
  }

  get inputClasses(): string {
    const baseClasses = `
      block w-full rounded-lg border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    `;

    const paddingClasses = this.icon ? 'pl-10 pr-10 py-3' : 'px-4 py-3';

    const stateClasses = this.showError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : this.control?.valid && this.control?.dirty
        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return this.selectClasses || `${baseClasses} ${paddingClasses} ${stateClasses}`;
  }
}
