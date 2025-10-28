import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy, OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() length: number = 6;
  @Input() title: string = 'Ingresa el código OTP';
  @Input() subtitle: string = 'Hemos enviado un código de verificación a tu dispositivo';
  @Input() showResend: boolean = true;
  @Input() resendTimeout: number = 60;
  @Input() errorMessage: string = 'Código inválido';

  @Output() otpComplete: EventEmitter<string> = new EventEmitter<string>();
  @Output() resend = new EventEmitter<void>();

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  digits: string[] = [];
  hasError: boolean = false;
  resendDisabled: boolean = true;
  countdown: number = 0;
  private countdownInterval: any;

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.digits = new Array(this.length).fill('');
    this.startResendCountdown();
  }

  ngAfterViewInit() {
    // Auto-focus en el primer input
    setTimeout(() => {
      this.focusInput(0);
    }, 100);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  public onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let newValue = JSON.parse(JSON.stringify(input.value));
    newValue = newValue.replace(/\D/g, '');
    if (newValue.length == 0) {
      this.digits[index] = "";
      input.value = "";
      return;
    } else {
      input.value = newValue;
      this.digits[index] = newValue;
      if (index < this.length - 1) {
        this.focusInput(index + 1);
      } else {
        this.checkComplete();
      }
    }
  }

  public onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      this.digits[index] = '';
      const input = event.target as HTMLInputElement;
      input.value = "";
      if (index > 0) {
        this.focusInput(index - 1);
        return;
      }
      this.hasError = false;
      this._cdr.detectChanges();
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      this.focusInput(index - 1);
    }
    if (event.key === 'ArrowRight' && index < this.length - 1) {
      this.focusInput(index + 1);
    }
  }

  public onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').split('');

    // Llenar los inputs con los dígitos pegados
    for (let i = 0; i < digits.length && (index + i) < this.length; i++) {
      this.digits[index + i] = digits[i];
    }

    // Mover al último input lleno o al final
    const lastIndex = Math.min(index + digits.length, this.length - 1);
    this.focusInput(lastIndex);

    this.checkComplete();
  }

  private focusInput(index: number) {
    const inputs = this.otpInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
    }
  }

  private checkComplete() {
    const otp = this.digits.join('');
    if (otp.length === this.length) {
      this.otpComplete.emit(otp);
    }
  }

  private startResendCountdown() {
    this.countdown = this.resendTimeout;
    this.resendDisabled = true;

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  onResendClick() {
    this.resend.emit();
    this.startResendCountdown();
    this.clear();
  }

  public clear() {
    this.digits = new Array(this.length).fill('');
    this.hasError = false;
    this.focusInput(0);
  }
}
