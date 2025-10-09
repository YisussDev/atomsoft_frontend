import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationService} from "@core/services/navigation/navigation.service";
import Swal from "sweetalert2";
import {LogoutAccountUseCase} from "@application/ports/in/account/logout-account.use-case";
import {VerifyTwoFactorAccountUseCase} from "@application/ports/in/account/verify-two-factor-account.use-case";

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent implements OnInit {

  public formOtp!: FormGroup;
  isLoading = false;
  isResending = false;
  error = '';
  success = false;
  otpValues: string[] = ['', '', '', ''];
  public quantityOtp: 1 | 2 | 3 | 4 = 4;

  constructor(
    private _formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private logoutAccountUseCase: LogoutAccountUseCase,
    private verifyTwoFactorAccountUseCase: VerifyTwoFactorAccountUseCase,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formOtp = this._formBuilder.group({});
    for (let index = 0; index < this.quantityOtp; index++) {
      this.formOtp.addControl(index.toString(), new FormControl(null, Validators.required));
    }
  }

  public onOtpChange(index: number, event: any) {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      event.target.value = this.otpValues[index];
      this.formOtp.controls[index.toString()].setValue(null);
      return;
    }
    if (value && index < this.quantityOtp) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

  }

  public onKeyDown(index: number, event: KeyboardEvent) {
    setTimeout(() => {
      if (event.key === 'Backspace' && index > 0) {
        if ((index + 1) == this.quantityOtp) {
          const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
          if (prevInput) {
            prevInput.focus();
          }
        } else {
          const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
          if (prevInput) {
            prevInput.focus();
          }
        }
      }
    }, 100);
  }

  async onVerify() {
    const otpToSend: string = this.extractOtp();
    this.verifyTwoFactorAccountUseCase.execute(otpToSend).subscribe();
  }

  public extractOtp(): string {
    const keys: string[] = Object.keys(this.formOtp.value);
    let otp: string = "";
    for (const key of keys) {
      otp = otp.concat(this.formOtp.controls[key].value);
    }
    return otp;
  }

  async onResend() {
    this.isResending = true;
    this.error = '';

    try {
      // Simular reenvío del código
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Limpiar campos
      this.otpValues = ['', '', '', '', '', ''];
      for (let i = 0; i < 6; i++) {
        const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }
      // this.otpForm.patchValue({otp: ''});

    } finally {
      this.isResending = false;
    }
  }

  public onBackToLogin() {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: "¿Deseas cerrar sesión?",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "gray",
      confirmButtonText: "Cerrar sesión",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.logoutAccountUseCase.execute().subscribe();
      }
    })
  }

  onContinue() {
    // Implementar navegación después del éxito
    console.log('Continuar');
  }

}
