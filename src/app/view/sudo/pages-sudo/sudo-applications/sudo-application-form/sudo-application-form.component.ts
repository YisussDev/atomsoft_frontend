import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-sudo-application-form',
  templateUrl: './sudo-application-form.component.html',
  styleUrls: ['./sudo-application-form.component.css']
})
export class SudoApplicationFormComponent implements OnInit {

  @Input() mode: 'create' | 'update' = 'create';
  @Input() data?: ApplicationEntity;
  @Input() loading = false;
  @Input() title = 'Formulario de Aplicación';

  @Output() submitForm = new EventEmitter<Partial<ApplicationEntity>>();
  @Output() cancel = new EventEmitter<void>();

  public step: number = 1;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.initForm();
    if (this.data) {
      this.patchFormValues();
    }
  }

  get submitButtonText(): string {
    const texts = {
      create: 'Crear Aplicación',
      update: 'Actualizar Aplicación'
    };
    return texts[this.mode];
  }

  public initForm() {
    const baseControls = {
      name: ['PraxiTask', [Validators.required, Validators.minLength(5)]],
      code: ['praxi_task', [Validators.required, Validators.minLength(5)]],
      description: ['Descripción corta para aplicación.', [Validators.required, Validators.minLength(5)]],
      logo_url: [null, [Validators.required]],
      price: [0, [Validators.required]],
      url_production: ["http://test.com/", [Validators.required]],
      url_sandbox: ["http://test.com/", [Validators.required]],
      url_test: ["http://test.com/", [Validators.required]],
      url_front_production: ["http://test.com/", [Validators.required]],
      url_front_sandbox: ["http://test.com/", [Validators.required]],
      url_front_test: ["http://test.com/", [Validators.required]],
      recursive_payment: [0, [Validators.required]],
    };
    // Agregar confirmPassword solo para modo create
    if (this.mode === 'create') {
      // (baseControls as any).confirmPassword = ['', [Validators.required]];
    }
    // Ajustar validadores según modo
    if (this.mode === 'update') {
      // baseControls.name = ['', [Validators.minLength(5)]];
    }
    this.form = this.fb.group(baseControls);
  }

  public patchFormValues() {
    if (!this.data) return;

    const values: any = {
      name: this.data.name,
    };

    this.form.patchValue(values);
  }

  public onSubmit() {
    // event.preventDefault();
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.form.value;
    let accountData: Partial<ApplicationEntity>;

    if (this.mode === 'update' && this.data) {
      accountData = this.getChangedValues(formValue);
    } else {
      accountData = this.prepareAccountData(formValue);
    }

    this.submitForm.emit(accountData);
  }

  public onSubmitStepOne(): void {
    console.log(this.form.value);
    return;
    this.step = 2;
  }

  public onCancelStepOne(): void {
    this.navigationService.navigateTo("/sudo/application/list");
  }

  public onSubmitStepTwo(): void {
    this.onSubmit();
  }

  public onCancelStepTwo(): void {
    this.step = 1;
  }

  private getChangedValues(formValue: any): Partial<ApplicationEntity> {
    const changes: Partial<ApplicationEntity> = {};

    // Campos de texto
    const textFields = ['name', "logo_url", "description", "code", "price"];
    textFields.forEach(field => {
      if (this.data![field as keyof ApplicationEntity] !== formValue[field] && formValue[field]) {
        changes[field as keyof ApplicationEntity] = formValue[field];
      }
    });

    return changes;
  }

  private prepareAccountData(formValue: any): Partial<ApplicationEntity> {
    return {
      name: formValue.name,
      description: formValue.description,
      code: formValue.code,
      logo_url: formValue.logo_url,
      price: formValue.price,
      url_production: formValue.url_production,
      url_sandbox: formValue.url_sandbox,
      url_test: formValue.url_test,
      url_front_production: formValue.url_front_production,
      url_front_sandbox: formValue.url_front_sandbox,
      url_front_test: formValue.url_front_test,
      recursive_payment: formValue.recursive_payment,
    };
  }

  public onCancel() {
    this.cancel.emit();
  }

}
