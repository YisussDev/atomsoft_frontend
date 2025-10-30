import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputColorComponent),
      multi: true
    }
  ]
})
export class InputColorComponent implements ControlValueAccessor {
  @Input() title: string = 'Color';
  @Input() description: string = 'Selecciona un color';
  @Input() isDisabled: boolean = false;

  internalValue: string = '#000000';

  private onChange: (value: string) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  onColorChange(event: Event): void {
    if (this.isDisabled) return;

    const input = event.target as HTMLInputElement;
    this.internalValue = input.value;
    this.onChange(this.internalValue);
    this.onTouched();
  }

  writeValue(value: string): void {
    if (value && /^#[0-9A-F]{6}$/i.test(value)) {
      this.internalValue = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
