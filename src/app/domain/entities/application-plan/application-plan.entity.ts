import {IsRequiredValidator} from "@shared/validators/IsRequired.validator";
import {IsMinLengthValidator} from "@shared/validators/IsMinLength.validator";
import {IsMaxLengthValidator} from "@shared/validators/IsMaxLength.validator";
import {IsMinNumberValidator} from "@shared/validators/IsMinNumber.validator";
import {IsEnumValidator} from "@shared/validators/IsEnum.validator";

export class ApplicationPlanEntity {
  id!: number;

  //More properties...

  code!: string;
  name!: string;
  description!: string;
  price!: number;
  limit_account!: number;
  currency!: string;
  config?: Record<string, any>;
  chips?: string[];

  validateToCreate(): void {
    this.validateCode();
    this.validateName();
    this.validateDescription();
    this.validatePrice();
    this.validateLimitAccount();
    this.validateCurrency();
  }

  validateCode(): void {
    IsRequiredValidator(this.code, "code");
    IsMinLengthValidator(this.code, "code", 4);
    IsMaxLengthValidator(this.code, "name", 50);
  }

  validateName(): void {
    IsRequiredValidator(this.name, "name");
    IsMinLengthValidator(this.name, "name", 4);
    IsMaxLengthValidator(this.name, "name", 50);
  }

  validateDescription(): void {
    IsRequiredValidator(this.description, "description");
    IsMinLengthValidator(this.description, "description", 4);
    IsMaxLengthValidator(this.description, "description", 255);
  }

  validatePrice(): void {
    IsRequiredValidator(this.description, "description");
    IsMinNumberValidator(this.price, "price", 0);
  }

  validateLimitAccount(): void {
    IsRequiredValidator(this.limit_account, "limit_account");
    IsMinNumberValidator(this.limit_account, "limit_account", 1);
  }

  validateCurrency(): void {
    IsRequiredValidator(this.currency, "currency");
    IsEnumValidator(this.currency, "currency", ["COP", "USD"]);
  }

  validateToUpdate(): void {
  }

  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;
}
