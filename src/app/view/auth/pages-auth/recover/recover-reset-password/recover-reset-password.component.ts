import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ThemeService} from "@core/services/theme/theme.service";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {
  RecoverValidateTokenAccountUseCase
} from "@application/ports/in/recover/recover-validate-token-account.use-case";
import {
  RecoverPasswordWithTokenAccountUseCase
} from "@application/ports/in/recover/recover-password-with-token-account.use-case";
import {validatorPassword} from "@ui/inputs/validators/validator-password";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recover-reset-password',
  templateUrl: './recover-reset-password.component.html',
  styleUrls: ['./recover-reset-password.component.css']
})
export class RecoverResetPasswordComponent implements OnInit, OnDestroy, AfterViewInit {

  public formLogin!: FormGroup;
  public themeActive: boolean = true;

  private token!: string;
  private email!: string;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private recoverValidateTokenRecoverAccountUseCase: RecoverValidateTokenAccountUseCase,
    private recoverPasswordWithTokenAccountUseCase: RecoverPasswordWithTokenAccountUseCase,
    private navigationUi: NavigationUi,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.extractParams();
    this.validateToken();
    this.initForm();
    this.initListenTheme();
  }

  ngAfterViewInit() {
  }

  private extractParams(): void {
    const {params} = this._activatedRoute.snapshot;
    const {tokenRecover, email} = params;
    this.token = tokenRecover;
    this.email = email;
  }

  private validateToken(): void {
    this.recoverValidateTokenRecoverAccountUseCase.execute(this.token, this.email).subscribe();
  }

  private initListenTheme(): void {
    this.themeService.themeActive.pipe(
      takeUntil(this._subscriber)
    ).subscribe(status => {
      this.themeActive = status;
    });
  }

  private initForm(): void {
    this.formLogin = this._formBuilder.group({
      password: ["123asd123@A", [Validators.required, validatorPassword]],
      confirm_password: ["123asd123@A", [Validators.required, validatorPassword]],
    })
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      const {password, new_password} = this.formLogin.controls;
      this.recoverPasswordWithTokenAccountUseCase.execute(this.token, this.email, password.value).subscribe();
    }
  }

  public onCancel(): void {
    this.navigationUi.goToAuth();
  }

  get validateForm(): boolean {
    const {password, confirm_password} = this.formLogin.controls;
    if (password.invalid || confirm_password.invalid) return false;
    return password.value == confirm_password.value;
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
