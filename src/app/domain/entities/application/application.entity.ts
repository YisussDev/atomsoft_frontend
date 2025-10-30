import {ApplicationPlanEntity} from "@domain/entities/application-plan/application-plan.entity";
import {IsRequiredValidator} from "@shared/validators/IsRequired.validator";
import {IsMinLengthValidator} from "@shared/validators/IsMinLength.validator";
import {IsMaxLengthValidator} from "@shared/validators/IsMaxLength.validator";

export class ApplicationEntity {
  id!: number;

  //More properties...

  code!: string;
  name!: string;
  logo_url!: string;
  description!: string;
  chips!: string[];
  img_chips!: string[];

  color_primary!: string;

  url_production!: string;
  url_sandbox!: string;
  url_test!: string;

  url_front_production!: string;
  url_front_sandbox!: string;
  url_front_test!: string;

  recursive_payment!: number;

  plans!: ApplicationPlanEntity[];

  validateToCreate(): void {
    this.validateCode();
    this.validateName();
    this.validateDescription();
  }

  validateToUpdate(): void {
  }

  validateCode(): void {
    IsRequiredValidator(this.code, "code");
    IsMinLengthValidator(this.code, "code", 6);
    IsMaxLengthValidator(this.code, "code", 20);
  }

  validateName(): void {
    IsRequiredValidator(this.name, "name");
    IsMinLengthValidator(this.name, "name", 6);
    IsMaxLengthValidator(this.name, "name", 20);
  }

  validateDescription(): void {
    IsRequiredValidator(this.description, "description");
    IsMinLengthValidator(this.description, "description", 6);
    IsMaxLengthValidator(this.description, "description", 255);
  }


  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;
}
