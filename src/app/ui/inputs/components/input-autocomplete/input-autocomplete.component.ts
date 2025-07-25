import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {fromEvent, takeUntil} from "rxjs";
import {UUID} from "angular2-uuid";
import {InputSchema} from "../../models/input-schema";
import {ErrorInputService} from "../../services/error-input.service";

@Component({
  selector: 'combo-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent extends InputSchema implements OnInit, OnChanges, AfterViewInit, OnDestroy {

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

  public classIdentifier!: string;
  public valueSelected: any;

  @Input() public keyToChangeControl: string = "id";
  @Input() public keyToShowControl: string = "name";
  @Input() public keyToShowSecondControl: string = "id";
  @Input() public keyFirstToSearch: string = "id";
  @Input() public keySecondToSearch: string = "id";

  @Input() public dataVisible: any[] = [];
  @Input() public dataAutoComplete: any[] = [];

  public isInputFocused: boolean = false;


  @Output() $customLogicInput: EventEmitter<string | number | null> = new EventEmitter<string | number | null>();

  constructor(
    private errorInputService: ErrorInputService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.classIdentifier = UUID.UUID();
    this.initAutocomplete();
    this.listenChangesControl();
    // this.initInput();
    // this.initListenKeyDown();
  }

  ngAfterViewInit() {
    this.initListenKeyDown();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['dataAutoComplete']) {
      if (changes['dataAutoComplete'].previousValue && changes['dataAutoComplete'].currentValue) {
        this.initInput();
      }
    }
  }

  public override listenChangesControl(): void {
    if (this.control) {
      this.control.valueChanges.pipe(
        takeUntil(this._subscriber)
      ).subscribe(value => {
        if (value != this.inputValue) {
          this.valueSelected = this.dataAutoComplete.find(itemData => itemData[this.keyToChangeControl] == this.control?.value);
          this.inputValue = this.valueSelected[this.keyToShowControl];
          this.control?.markAsTouched();
        }
      })
    }
  }

  public override initInput() {
    if (!this.control) return;
    if (!this.dataAutoComplete) return;
    if (this.control && this.control.value) {
      this.valueSelected = this.dataAutoComplete.find(itemData => itemData[this.keyToChangeControl] == this.control?.value);
      this.inputValue = this.valueSelected[this.keyToShowControl];
      this.control.markAsTouched();
    }
  }

  private initAutocomplete(): void {
    if (!this.control) return;
    this.dataVisible = this.dataAutoComplete.slice(0, 5);
    // this.initSelected();
  }

  public override changeValue(value: string): void {
    this.$customLogicInput.emit(this.inputValue);
    if (!this.control) return;
    if (value) {
      this.inputValue = null;
      this.valueSelected = null;
      if (this.keyFirstToSearch || this.keyToShowControl) this.dataVisible = [...this.searchByFirstKey(value)].slice(0, 5);
      if (this.keySecondToSearch) this.dataVisible = [...this.dataVisible, ...this.searchBySecondKey(value)].slice(0, 5);
    }
    if (this.control.value) {
      this.control.setValue(null);
      this.valueSelected = null;
      this.dataVisible = JSON.parse(JSON.stringify([...this.dataAutoComplete].slice(0, 5)));
    }
    if (!value) {
      this.dataVisible = JSON.parse(JSON.stringify([...this.dataAutoComplete].slice(0, 5)));
    }
  }

  public override getErrorMessage(): string {
    if (!this.control) return '';
    return this.errorInputService.extractErrorFromDictionary(this.control.errors);
  }

  private searchByFirstKey(query: string): any[] {
    if (!this.dataAutoComplete) return [];
    const dataFound = this.dataAutoComplete.filter(res => res[this.keyFirstToSearch || this.keyToShowControl] && res[this.keyFirstToSearch || this.keyToShowControl].toLowerCase().includes(query.trim().toLowerCase()));
    return JSON.parse(JSON.stringify(dataFound));
  }

  private searchBySecondKey(query: string): any[] {
    if (!this.dataAutoComplete) return [];
    const dataFound = JSON.stringify(this.dataAutoComplete.filter(res => res[this.keySecondToSearch] && res[this.keySecondToSearch].toLowerCase().includes(query.trim().toLowerCase())));
    return JSON.parse(dataFound);
  }

  public selectOption(optionSelected: any) {
    if (!this.control) return;
    this.valueSelected = JSON.parse(JSON.stringify(optionSelected));
    this.inputValue = JSON.parse(JSON.stringify(optionSelected[this.keyToShowControl]));
    this.control.setValue(JSON.parse(JSON.stringify(optionSelected[this.keyToChangeControl])));
    this._cdr.detectChanges();
    this.$customLogicInput.emit(optionSelected);
    this.isInputFocused = false;
  }

  public changeSelectToDown(): void {
    const boxOptions = document.getElementById('box-options');
    const options = document.getElementsByClassName('option-to-select');
    const lengthOptions: number = options.length;
    let indexSelected!: number;
    for (let i = 0; i < lengthOptions; i++) {
      if (options.item(i)?.classList.value.includes('active-option')) indexSelected = i;
    }
    if ((indexSelected >= 0) && (indexSelected < (this.dataVisible.length - 1))) {
      options.item(indexSelected)?.classList.toggle('active-option');
      options.item(indexSelected + 1)?.classList.toggle('active-option');
      this._cdr.detectChanges();
      if (boxOptions) boxOptions.scrollTop = (options.item(indexSelected) as HTMLElement).offsetTop - boxOptions.offsetTop;
      this.control?.setValue(this.dataVisible[indexSelected + 1][this.keyToChangeControl]);
      this.inputValue = this.dataVisible[indexSelected + 1][this.keyToShowControl];
      this.valueSelected = this.dataVisible[indexSelected + 1];
      this.$customLogicInput.emit(this.dataVisible[indexSelected + 1]);
    } else if (!indexSelected && (this.dataVisible.length >= 1)) {
      options.item(0)?.classList.add('active-option');
      // this.applyChangeControl(this.dataVisible[0][this.keyToChangeControl]);
      this.control?.setValue(this.dataVisible[0][this.keyToChangeControl]);
      this.inputValue = this.dataVisible[0][this.keyToShowControl];
      this.valueSelected = this.dataVisible[0];
      this.$customLogicInput.emit(this.dataVisible[0]);
    }
    this._cdr.detectChanges();
  }

  public changeSelectToUp(): void {
    const boxOptions = document.getElementById('box-options');
    const options = document.getElementsByClassName('option-to-select');
    const lengthOptions: number = options.length;
    let indexSelected!: number;
    for (let i = 0; i < lengthOptions; i++) {
      if (options.item(i)?.classList.value.includes('active-option')) indexSelected = i;
    }
    if ((indexSelected > 0)) {
      options.item(indexSelected)?.classList.toggle('active-option');
      options.item(indexSelected - 1)?.classList.toggle('active-option');
      this._cdr.detectChanges();
      if (boxOptions) boxOptions.scrollTop = (options.item(indexSelected) as HTMLElement).offsetTop - boxOptions.offsetTop;
      // this.applyChangeControl(this.dataVisible[indexSelected - 1][this.keyToChangeControl]);
      this.control?.setValue(this.dataVisible[indexSelected - 1][this.keyToChangeControl]);
      this.inputValue = this.dataVisible[indexSelected - 1][this.keyToShowControl];
      this.valueSelected = this.dataVisible[indexSelected - 1];
      this.$customLogicInput.emit(this.dataVisible[indexSelected - 1]);
    }
    this._cdr.detectChanges();
  }

  private initListenKeyDown(): void {
    const classIdentifier = document.getElementById(this.classIdentifier);
    if (classIdentifier) {
      fromEvent(classIdentifier, 'keydown').pipe(
        takeUntil(this._subscriber)
      ).subscribe((event: any) => {
        const key: string = event.key;
        if ((key == 'Tab') || (key == 'ArrowDown')) {
          event.preventDefault();
          this.changeSelectToDown();
          this._cdr.detectChanges();
        }
        if ((key == 'ArrowUp')) {
          event.preventDefault();
          this.changeSelectToUp();
          this._cdr.detectChanges();
        }
        if (event.key == 'Escape') {
          this.isInputFocused = false;
          this._cdr.detectChanges();
        }
        if (key == 'Enter') {
          event.preventDefault();
          if (this.isInputFocused) {
            this.isInputFocused = false;
          }
        }
      })
    }
  }

  public _onFocus(): void {
    this.isInputFocused = true;
  }

  public _outFocus(): void {
    this.isInputFocused = false;
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
