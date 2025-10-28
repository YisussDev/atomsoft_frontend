import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AccountEntity} from "@domain/entities/account/account.entity";

@Component({
  selector: 'app-sudo-accounts-form',
  templateUrl: './sudo-accounts-form.component.html',
  styleUrls: ['./sudo-accounts-form.component.css']
})
export class SudoAccountsFormComponent implements OnInit {
  @Input() mode: 'create' | 'update' | 'login' = 'create';
  @Input() account?: AccountEntity;
  @Input() loading = false;
  @Input() title = 'Formulario de Cuenta';

  @Output() submitForm = new EventEmitter<Partial<AccountEntity>>();
  @Output() cancel = new EventEmitter<void>();

  accountForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showPasswordFields = false;

  // Password strength indicators
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.setupPasswordValidation();

    if (this.account) {
      this.patchFormValues();
    }
  }

  get submitButtonText(): string {
    const texts = {
      create: 'Crear Cuenta',
      update: 'Actualizar Cuenta',
      login: 'Iniciar Sesión'
    };
    return texts[this.mode];
  }

  initForm() {
    const baseControls = {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', this.mode === 'create' ? [Validators.required, this.passwordValidator()] : []],
      tenant_code: ['', this.mode === 'create' ? [Validators.required, Validators.minLength(4)] : [Validators.minLength(4)]],
      active: [true],
      two_factor_auth: [false],
    };

    // Agregar confirmPassword solo para modo create
    if (this.mode === 'create') {
      (baseControls as any).confirmPassword = ['', [Validators.required]];
    }

    // Ajustar validadores según modo
    if (this.mode === 'update') {
      baseControls.email = ['', [Validators.email]];
      baseControls.username = ['', [Validators.minLength(5)]];
      baseControls.name = ['', [Validators.minLength(5)]];
    } else if (this.mode === 'login') {
      this.accountForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
      return;
    }

    this.accountForm = this.fb.group(baseControls, {
      validators: this.mode === 'create' ? this.passwordMatchValidator : null
    });
  }

  setupPasswordValidation() {
    this.accountForm.get('password')?.valueChanges.subscribe(password => {
      if (password) {
        this.hasMinLength = password.length >= 8;
        this.hasUpperCase = /[A-Z]/.test(password);
        this.hasLowerCase = /[a-z]/.test(password);
        this.hasNumber = /[0-9]/.test(password);
        this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      }
    });
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasMinLength = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const passwordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

      return passwordValid ? null : {passwordStrength: true};
    };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  patchFormValues() {
    if (!this.account) return;

    const values: any = {
      email: this.account.email,
      username: this.account.username,
      name: this.account.name,
      tenant_code: this.account.tenant_code,
      active: this.account.active === 1,
      two_factor_auth: this.account.two_factor_auth === 1,
    };

    this.accountForm.patchValue(values);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.accountForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'Email inválido',
      minlength: `Mínimo ${errors['minlength']?.requiredLength} caracteres`,
      passwordStrength: 'La contraseña no cumple con los requisitos',
      passwordMismatch: 'Las contraseñas no coinciden'
    };

    const errorKey = Object.keys(errors)[0];
    return errorMessages[errorKey] || 'Campo inválido';
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      Object.keys(this.accountForm.controls).forEach(key => {
        this.accountForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.accountForm.value;
    const accountData: Partial<AccountEntity> = {
      email: formValue.email,
      username: formValue.username,
      name: formValue.name,
      password: formValue.password,
      tenant_code: formValue.tenant_code,
      active: formValue.active ? 1 : 0,
      two_factor_auth: formValue.two_factor_auth ? 1 : 0,
    };

    // Limpiar campos vacíos en modo update
    if (this.mode === 'update') {
      Object.keys(accountData).forEach(key => {
        if (!accountData[key as keyof AccountEntity]) {
          delete accountData[key as keyof AccountEntity];
        }
      });
    }

    this.submitForm.emit(accountData);
  }

  onCancel() {
    this.cancel.emit();
  }
}
