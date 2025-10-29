import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-application-form-step-two',
  templateUrl: './application-form-step-two.component.html',
  styleUrls: ['./application-form-step-two.component.css']
})
export class ApplicationFormStepTwoComponent {

  @Input() public formStep!: FormGroup;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() loading = false;

  @Output() submitStep: EventEmitter<any> = new EventEmitter();
  @Output() cancelStep: EventEmitter<any> = new EventEmitter();

  get submitButtonText(): string {
    const texts = {
      create: 'Crear',
      update: 'Actualizar'
    };
    return texts[this.mode];
  }

  get validationStep(): boolean {
    const {code, name, description} = this.formStep.controls;
    return (
      code.valid &&
      name.valid &&
      description.valid
    )
  }

  public onSubmit(): void {
    this.submitStep.emit();
  }

  public onCancel(): void {
    this.cancelStep.emit();
  }

}
