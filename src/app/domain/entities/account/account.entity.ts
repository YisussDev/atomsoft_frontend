import {validateEmail} from "@shared/validators/email.validator";
import {validateMinLength} from "@shared/validators/string-length.validator";
import {validatePassword} from "@shared/validators/password.validator";

export class AccountEntity {
  id!: number;
  email!: string;
  username!: string;
  name!: string;
  password!: string;
  last_password!: string;
  tenant_code!: string;
  active!: 0 | 1;
  two_factor_auth!: 0 | 1;
  roles!: string[];
  permission!: string[];

  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  validateToCreate(): void {
    this.validateEmailEntity();
    this.validateNameEntity();
    this.validateUsernameEntity();
    this.validatePasswordEntity();
    // this.validateTenantCodeEntity();
  }

  validateToUpdate(): void {
    if (this.name) {
      this.validateNameEntity();
    }
    if (this.username) {
      this.validateUsernameEntity();
    }
    if (this.email) {
      this.validateEmailEntity();
    }
  }

  validateToLogin(): void {
    if (this.email) {
      this.validateEmailEntity();
    }
    if (this.password) {
      this.validatePasswordEntity();
    }
  }

  validateEmailEntity(): void {
    validateEmail(this.email, 'Correo electrónico');
  }

  validateUsernameEntity(): void {
    validateMinLength(this.username, 5, 'Nombre de usuario');
  }

  validateNameEntity(): void {
    validateMinLength(this.name, 5, 'name');
  }

  validatePasswordEntity(): void {
    validatePassword(this.password, 'Contraseña');
  }

  validateTenantCodeEntity(): void {
    validateMinLength(this.tenant_code, 4, 'tenant_code');
  }
}
