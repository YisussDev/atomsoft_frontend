import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NotificationService} from "@core/services/notification/notification.service";

@Component({
  selector: 'app-application-form-step-one',
  templateUrl: './application-form-step-one.component.html',
  styleUrls: ['./application-form-step-one.component.css']
})
export class ApplicationFormStepOneComponent {

  @Input() public formStep!: FormGroup;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() loading = false;

  @Output() submitStep: EventEmitter<any> = new EventEmitter();
  @Output() cancelStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private notificationService: NotificationService,
  ) {
  }


  get submitButtonText(): string {
    const texts = {
      create: 'Siguiente',
      update: 'Siguiente'
    };
    return texts[this.mode];
  }

  get validationStep(): boolean {
    const {code, name, description, logo_url} = this.formStep.controls;
    return (
      code.valid &&
      name.valid &&
      description.valid &&
      logo_url.valid
    )
  }

  public onUpload(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    const {logo_url} = this.formStep.controls;
    logo_url.setValue(file);
    this.notificationService.success("Archivo cargado!");
  }

  public onRemove(): void {
    const {logo_url} = this.formStep.controls;
    logo_url.setValue(null);
    this.notificationService.info("Archivo removido!");
  }

  public onSubmit(): void {
    this.submitStep.emit();
  }

  public onCancel(): void {
    this.cancelStep.emit();
  }

}
