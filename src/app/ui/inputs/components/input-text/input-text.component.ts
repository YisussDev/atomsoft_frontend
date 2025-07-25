import {
  OnInit,
  Component,
  Input,
  Output,
  EventEmitter, OnDestroy,
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {InputSchema} from "../../models/input-schema";
import {ErrorInputService} from "../../services/error-input.service";

@Component({
  selector: 'combo-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent extends InputSchema implements OnInit, OnDestroy {

  @Input() public override control?: AbstractControl;
  @Input() public override inputValue: string | number | null = null;
  @Input() public override inputTheme: 'NORMAL' | 'LIGHT' | 'MATERIAL' = 'NORMAL';
  @Input() public override inputLabel: string = 'default_label';
  @Input() public override inputName: string = 'default_name';
  @Input() public override inputPlaceholder: string = 'default_placeholder';
  @Input() public override inputColorBorderEmpty: string = '#3a3a3a';
  @Input() public override inputColorBackgroundEmpty: string = 'rgba(255,255,255,0)';
  @Input() public override inputColorBackgroundSuccess: string = 'rgba(108,255,116,0.5)';
  @Input() public override inputColorTextSuccess: string = '#FFF';
  @Input() public override inputColorBorderSuccess: string = '#1aff00';
  @Input() public override inputColorBackgroundError: string = 'rgba(255,89,89,0.5)';
  @Input() public override inputColorTextError: string = '#FFF';
  @Input() public override inputColorBorderError: string = '#ff1111';
  @Input() public override inputIconActive?: boolean = false;
  @Input() public override inputTypeIcon?: 'material' | 'fa';
  @Input() public override inputIcon?: string;
  @Input() public override disabled: boolean = false;
  @Input() public override touched: boolean = false;

  @Output() $customLogicInput: EventEmitter<string | number | null> = new EventEmitter<string | number | null>();

  constructor(
    private errorInputService: ErrorInputService
  ) {
    super();
  }

  ngOnInit() {
    this.initInput();
    this.listenChangesControl();
  }

  public override initInput(): void {
    if (!this.control) return;
    if (this.control.value) {
      this.inputValue = this.control.value;
      this.control.markAsTouched();
    }
  }

  public override changeValue(value: string | number | null): void {
    this.$customLogicInput.emit(this.inputValue);
    if (!this.control) return;
    this.control.setValue(value);
  }

  public override getErrorMessage(): string {
    if (!this.control) return '';
    return this.errorInputService.extractErrorFromDictionary(this.control.errors);
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
