import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ThemeService} from "@core/services/theme/theme.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {LoginAccountUseCase} from "@application/use-cases/account/login-account.use-case";
import {LoginWithGoogleAccountUseCase} from "@application/use-cases/account/login-with-google-account.use-case";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formRegister!: FormGroup;
  public themeActive: boolean = true;
  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private loginAccountUseCase: LoginAccountUseCase,
    private loginWithGoogleAccountUseCase: LoginWithGoogleAccountUseCase,
    private _formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.initListenTheme();

    (window as any).handleCredentialResponse = (response: any) => {
      const jwt = response.credential;
      this.loginWithGoogle(jwt)
    };
  }

  private initListenTheme(): void {
    this.themeService.themeActive.pipe(
      takeUntil(this._subscriber)
    ).subscribe(status => {
      this.themeActive = status;
    });
  }

  private initForm(): void {
    this.formRegister = this._formBuilder.group({
      name: ["TestUser", Validators.required],
      username: ["TestUser", Validators.required],
      email: ["admin@test.com", Validators.required],
      password: ["123asd123@A", [Validators.required]],
      password_confirmation: ["123asd123@A", [Validators.required]],
    })
  }

  public loginWithGoogle(tokenGoogle: string): void {
    this.loginWithGoogleAccountUseCase.execute(tokenGoogle).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  public onSubmit(): void {
    if (this.formRegister.valid) {
      const {email, password} = this.formRegister.controls;
      this.loginAccountUseCase.execute({email: email.value, password: password.value}).subscribe({
        next: () => {

        }
      })
    }
  }

  public cancelSubmit(): void {
    this.navigationService.navigateTo('/auth/login');
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
