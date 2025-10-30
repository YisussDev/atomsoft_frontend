import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectOption} from "@ui/inputsv2/components/input-select/input-select.component";
import {NotificationService} from "@core/services/notification/notification.service";
import {ApplicationPlanEntity} from "@domain/entities/application-plan/application-plan.entity";
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-application-form-step-three',
  templateUrl: './application-form-step-three.component.html',
  styleUrls: ['./application-form-step-three.component.css']
})
export class ApplicationFormStepThreeComponent implements OnInit {

  @Input() public formStep!: FormGroup;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() loading = false;

  @Output() submitStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelStep: EventEmitter<void> = new EventEmitter<void>();

  public currencyTypeList: SelectOption[] = [
    {
      value: "COP",
      label: "Peso Colombiano"
    },
    {
      value: "USD",
      label: "Dolar Estadounidense"
    }
  ];

  public limitAccountList: SelectOption[] = [
    {
      value: 1,
      label: "1 Cuenta"
    },
    {
      value: 2,
      label: "2 Cuentas"
    },
    {
      value: 3,
      label: "3 Cuentas"
    },
    {
      value: 10,
      label: "10 Cuentas"
    },
  ];

  public isVisibleModalPlan: boolean = false;

  public isEditing: boolean = false;

  public formPlans!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formPlans = this._formBuilder.group({
      id: [""],
      code: [UUID.UUID().replace(/-/g, "").toUpperCase()],
      name: ["Plan Free", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      description: ["Descripción free.", [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
      price: [0, [Validators.required]],
      limit_account: [1, [Validators.required, Validators.min(1)]],
      currency: ["COP", [Validators.required]],
      config: [{}],
      chips: [["Rapido"]]
    });
  }

  get submitButtonText(): string {
    const texts = {
      create: 'Crear',
      update: 'Actualizar'
    };
    return texts[this.mode];
  }

  get validationStep(): boolean {
    const {
      plans
    } = this.formStep.controls;
    return (
      plans.value &&
      (plans.value.length > 0)
    )
  }

  public onSubmit(): void {
    this.submitStep.emit();
  }

  public onCancel(): void {
    this.cancelStep.emit();
  }

  public openModalCreatePlan(): void {
    const {code, config} = this.formPlans.controls;
    code.setValue(UUID.UUID().replace(/-/g, "").toUpperCase());
    config.setValue({});
    this.isVisibleModalPlan = true;
  }

  get validationFormPlan(): boolean {
    const {
      name,
      description,
      price,
      limit_account,
      currency,
      config,
      chips,
    } = this.formPlans.controls;
    return (
      name.valid &&
      description.valid &&
      limit_account.valid &&
      currency.valid
    )
  }

  public onCloseModal(): void {
    this.isVisibleModalPlan = false;
    this.formPlans.reset();
    this.isEditing = false;
  }

  public submitModalPlan(): void {
    if (this.validationFormPlan) {
      const {plans} = this.formStep.controls;
      plans.setValue([...plans.value, this.formPlans.value]);
      this.notificationService.success("Plan agregado!");
      this.isVisibleModalPlan = false;
      this.formPlans.reset();
    }
  }

  public submitModalUpdatePlan(): void {
    if (this.validationFormPlan) {
      const {plans} = this.formStep.controls;
      const {code} = this.formPlans.controls;
      const actualPlans: ApplicationPlanEntity[] = plans.value;
      const indPlanUpdating: number = actualPlans.findIndex(plan => plan.code === code.value);
      if (indPlanUpdating != -1) {
        actualPlans.splice(indPlanUpdating, 1, this.formPlans.value);
        plans.setValue([...actualPlans]);
        this.notificationService.success("Plan actualizado!");
        this.isVisibleModalPlan = false;
        this.isEditing = false;
        this.formPlans.reset();
      }
    }
  }

  public removePlan(plan: ApplicationPlanEntity): void {
    const {plans} = this.formStep.controls;
    const plansActual: ApplicationPlanEntity[] = plans.value;
    const plansFiltered: ApplicationPlanEntity[] = plansActual.filter(planActual => planActual.code !== plan.code);
    plans.setValue([...plansFiltered]);
    this.notificationService.success("Plan eliminado!");
  }

  public openModalUpdatePlan(plan: ApplicationPlanEntity): void {
    this.isEditing = true;
    this.formPlans.patchValue(plan);
    this.isVisibleModalPlan = true;
  }

}
