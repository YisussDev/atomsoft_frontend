import {Subject, Subscription, takeUntil} from "rxjs";
import {AbstractControl, ControlValueAccessor, FormControl} from "@angular/forms";
import {Input} from "@angular/core";

export class InputSchema {

  public control?: AbstractControl;
  public inputValue?: string | number | null;
  public inputTheme?: 'NORMAL' | 'LIGHT' | 'MATERIAL' = 'NORMAL';
  public inputLabel?: string;
  public inputName?: string;
  public inputPlaceholder?: string;
  public inputColorBorderEmpty?: string;
  public inputColorBackgroundEmpty?: string;
  public inputColorBackgroundSuccess?: string;
  public inputColorTextSuccess?: string;
  public inputColorBorderSuccess?: string;
  public inputColorBackgroundError?: string;
  public inputColorBorderError?: string;
  public inputColorTextError?: string;
  public inputIconActive?: boolean;
  public inputTypeIcon?: 'material' | 'fa';
  public touched?: boolean;
  public inputIcon?: string;
  public disabled?: boolean

  public _subscriber: Subject<void> = new Subject<void>();

  constructor() {
  }

  public listenChangesControl(): void {
    if (this.control) {
      this.control.valueChanges.pipe(
        takeUntil(this._subscriber)
      ).subscribe(value => {
        if (value != this.inputValue) {
          this.inputValue = value;
        }
      })
    }
  }

  public initInput(): void {
  };

  public touchedControl(): void {
    if (!this.control) return;
    if (this.touched) return;
    this.control.markAsTouched();
  };

  public hasError(): boolean {
    if (!this.control) return false;
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  };

  public isValid(): boolean | null {
    if (!this.control) return false;
    return this.control && this.control.valid && (this.control.dirty || this.control.touched);
  };

  public changeValue(value: string | number | null): void {
  };

  public getErrorMessage(): string {
    return '';
  };


}
