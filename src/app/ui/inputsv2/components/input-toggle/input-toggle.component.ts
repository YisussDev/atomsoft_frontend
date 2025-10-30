import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputToggleComponent),
      multi: true
    }
  ]
})
export class InputToggleComponent implements ControlValueAccessor {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() activeText: string = 'Activado';
  @Input() inactiveText: string = 'Desactivado';
  @Input() formControl?: FormControl;

  @Output() valueChange = new EventEmitter<0 | 1>();

  internalValue: 0 | 1 = 0;
  isDisabled: boolean = false;

  private onChange: (value: 0 | 1) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  // ControlValueAccessor methods
  writeValue(value: 0 | 1): void {
    this.internalValue = value ?? 0;
  }

  registerOnChange(fn: (value: 0 | 1) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onToggle(): void {
    if (!this.isDisabled) {
      this.internalValue = this.internalValue === 1 ? 0 : 1;
      this.onChange(this.internalValue);
      this.onTouched();
      this.valueChange.emit(this.internalValue);
    }
  }
}
