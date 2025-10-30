import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-application-form-step-three',
  templateUrl: './application-form-step-three.component.html',
  styleUrls: ['./application-form-step-three.component.css']
})
export class ApplicationFormStepThreeComponent {

  @Input() public formStep!: FormGroup;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() loading = false;

  @Output() submitStep: EventEmitter<any> = new EventEmitter();
  @Output() cancelStep: EventEmitter<any> = new EventEmitter();

  public formPlans!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  private initForm(): void {
    this.formPlans = this._formBuilder.group({});
  }

  get submitButtonText(): string {
    const texts = {
      create: 'Siguiente',
      update: 'Siguiente'
    };
    return texts[this.mode];
  }

  get validationStep(): boolean {
    const {
      chips,
      img_chips,
      recursive_payment,
      url_production,
      url_sandbox,
      url_test,
      url_front_production,
      url_front_sandbox,
      url_front_test,
    } = this.formStep.controls;
    return (
      url_production.valid &&
      url_sandbox.valid &&
      url_test.valid &&
      url_front_production.valid &&
      url_front_sandbox.valid &&
      url_front_test.valid
    )
  }

  public onSubmit(): void {
    this.submitStep.emit();
  }

  public onCancel(): void {
    this.cancelStep.emit();
  }

}
