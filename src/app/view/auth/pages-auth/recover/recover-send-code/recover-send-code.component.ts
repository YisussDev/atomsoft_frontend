import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ThemeService} from "@core/services/theme/theme.service";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {validatorEmail} from "@ui/inputs/validators/validator-email";
import {RecoverAccountUseCase} from "@application/ports/in/recover/recover-account.use-case";

@Component({
  selector: 'app-recover-send-code',
  templateUrl: './recover-send-code.component.html',
  styleUrls: ['./recover-send-code.component.css']
})
export class RecoverSendCodeComponent implements OnInit, OnDestroy, AfterViewInit {

  public formLogin!: FormGroup;
  public themeActive: boolean = true;
  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private recoverAccountUseCase: RecoverAccountUseCase,
    private navigationUi: NavigationUi,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initListenTheme();
  }

  ngAfterViewInit() {
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
      email: ["paguayjesus@gmail.com", [Validators.required, validatorEmail]],
    })
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      const {email} = this.formLogin.controls;
      this.recoverAccountUseCase.execute(email.value).subscribe();
    }
  }

  public onCancel(): void {
    this.navigationUi.goToAuth();
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
