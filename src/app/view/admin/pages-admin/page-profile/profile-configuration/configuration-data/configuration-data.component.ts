import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccountEntity} from "@domain/entities/account/account.entity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validatorEmail} from "@ui/inputs/validators/validator-email";
import {UpdateAccountUseCase} from "@application/ports/in/account/update-account.use-case";

@Component({
  selector: 'app-configuration-data',
  templateUrl: './configuration-data.component.html',
  styleUrls: ['./configuration-data.component.css']
})
export class ConfigurationDataComponent implements OnInit, OnChanges {

  @Input() public account!: AccountEntity;

  public formAccount!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private updateAccountUseCase: UpdateAccountUseCase
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes["account"].currentValue) {
      if (!this.formAccount) return;
      this.formAccount.patchValue(this.account);
    }
  }

  private initForm(): void {
    this.formAccount = this._formBuilder.group({
      email: ["", [Validators.required, validatorEmail]],
      name: ["", Validators.required],
    });
    if (this.account) {
      this.formAccount.patchValue(this.account);
    }
  }

  public onSubmit(): void {
    if (this.formAccount.valid) {
      this.updateAccountUseCase.execute(this.account.id.toString(), this.formAccount.value).subscribe({
        next: (response) => {
        }
      });
    }
  }

}
