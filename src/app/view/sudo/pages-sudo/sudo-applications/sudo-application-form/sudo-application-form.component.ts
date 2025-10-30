import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-sudo-application-form',
  templateUrl: './sudo-application-form.component.html',
  styleUrls: ['./sudo-application-form.component.css']
})
export class SudoApplicationFormComponent implements OnInit, OnChanges {

  @Input() mode: 'create' | 'update' = 'create';
  @Input() data?: ApplicationEntity;
  @Input() loading = false;
  @Input() title: string = '';
  @Input() subTitle: string = '';

  @Output() submitForm = new EventEmitter<Partial<ApplicationEntity>>();
  @Output() cancel = new EventEmitter<void>();

  public step: 1 | 2 | 3 = 1;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.initForm();
    if (this.data) {
      this.patchFormValues();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes["data"].currentValue) {
      // console.log(this.data);
    }
  }

  public initForm(): void {
    const baseControls = {
      name: ['', [Validators.required, Validators.minLength(5)]],
      code: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      logo_url: ["", [Validators.required]],
      color_primary: ["#FFFFFF", [Validators.required]],
      url_production: ["http://test.com/", [Validators.required]],
      url_sandbox: ["http://test.com/", [Validators.required]],
      url_test: ["http://test.com/", [Validators.required]],
      url_front_production: ["http://test.com/", [Validators.required]],
      url_front_sandbox: ["http://test.com/", [Validators.required]],
      url_front_test: ["http://test.com/", [Validators.required]],
      recursive_payment: [0, [Validators.required]],
      chips: [[], []],
      img_chips: [[], []],
      plans: [[], []],
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
    this.initDataFormTest();
  }

  public initDataFormTest(): void {
    const dataTest = {
      name: "Name Test",
      code: "code_test",
      description: 'Descripción corta para aplicación.',
      logo_url: "https://pub-73f3f74bc61d42d3a64738ae825a6112.r2.dev/microservices/application/praxi_inventory.png",
      url_production: "http://test.com/",
      url_sandbox: "http://test.com/",
      url_test: "http://test.com/",
      url_front_production: "http://test.com/",
      url_front_sandbox: "http://test.com/",
      url_front_test: "http://test.com/",
      recursive_payment: 0,
      chips: ["Rapido", "Flexible", "Escalable"],
      img_chips: [
        "https://pub-73f3f74bc61d42d3a64738ae825a6112.r2.dev/microservices/application/inventory_banner_one.png",
        "https://pub-73f3f74bc61d42d3a64738ae825a6112.r2.dev/microservices/application/inventory_banner_two.png",
        "https://pub-73f3f74bc61d42d3a64738ae825a6112.r2.dev/microservices/application/inventory_banner_three.png",
      ],
      plans: []
    };
    this.form.patchValue(dataTest);
  }

  public patchFormValues(): void {
    if (!this.data) return;

    const values: any = {
      code: this.data.code,
      name: this.data.name,
      description: this.data.description,
      logo_url: this.data.logo_url,
      chips: this.data.chips,
      img_chips: this.data.img_chips,
      color_primary: this.data.color_primary,
      url_production: this.data.url_production,
      url_sandbox: this.data.url_sandbox,
      url_test: this.data.url_test,
      url_front_production: this.data.url_front_production,
      url_front_sandbox: this.data.url_front_sandbox,
      url_front_test: this.data.url_front_test,
      recursive_payment: this.data.recursive_payment,
      plans: this.data.plans || [],
    };

    this.form.patchValue(values);
  }

  public onSubmit() {
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
    this.step = 2;
  }

  public onCancelStepOne(): void {
    this.navigationService.navigateTo("/sudo/application/list");
  }

  public onSubmitStepTwo(): void {
    this.step = 3;
  }

  public onCancelStepTwo(): void {
    this.step = 1;
  }

  public onSubmitStepThree(): void {
    // console.log(this.form.value);
    this.onSubmit();
  }

  public onCancelStepThree(): void {
    this.step = 2;
  }

  private getChangedValues(formValue: any): Partial<ApplicationEntity> {
    const changes: Partial<ApplicationEntity> = {};

    // Campos de texto
    const textFields: string[] = [
      'name',
      'code',
      "logo_url",
      "description",
      "chips",
      "img_chips",
      "color_primary",
      "price",
      "url_production",
      "url_sandbox",
      "url_test",
      "url_front_production",
      "url_front_sandbox",
      "url_front_test",
      "recursive_payment",
      "plans",
      "color_primary"
    ];
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
      url_production: formValue.url_production,
      url_sandbox: formValue.url_sandbox,
      url_test: formValue.url_test,
      url_front_production: formValue.url_front_production,
      url_front_sandbox: formValue.url_front_sandbox,
      url_front_test: formValue.url_front_test,
      recursive_payment: formValue.recursive_payment,
      chips: formValue.chips,
      img_chips: formValue.img_chips,
      plans: formValue.plans,
      color_primary: formValue.color_primary,
    };
  }

}
