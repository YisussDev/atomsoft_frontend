import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ThemeService} from "@core/services/theme/theme.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {LoginAccountUseCase} from "@application/ports/in/auth/login-account.use-case";
import {LoginWithGoogleAccountUseCase} from "@application/ports/in/auth/login-with-google-account.use-case";

declare const google: any;

declare global {
  interface Window {
    google: any;
    handleCredentialResponse: (response: any) => void;
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  public formLogin!: FormGroup;
  public themeActive: boolean = true;
  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private loginAccountUseCase: LoginAccountUseCase,
    private loginWithGoogleAccountUseCase: LoginWithGoogleAccountUseCase,
    private _formBuilder: FormBuilder,
  ) {
    if ((window as any).google && google.accounts) {
      window.handleCredentialResponse = (response: any) => {
        this.loginWithGoogleAccountUseCase.execute(response.credential).subscribe({
          next: (event) => {
          }
        });
      };
    }
  }

  ngOnInit() {
    this.initForm();
    this.initListenTheme();
  }

  ngAfterViewInit() {
    this.renderGoogleButton();
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
      email: ["paguayjesus@gmail.com", Validators.required],
      password: ["123asd123@A", [Validators.required]],
    })
  }

  public login(): void {
    if (this.formLogin.valid) {
      const {email, password} = this.formLogin.controls;
      this.loginAccountUseCase.execute({email: email.value, password: password.value}).subscribe({
        next: (response) => {
        }
      })
    } else {

    }
  }

  public loginWithGoogle(tokenGoogle: string): void {
    this.loginWithGoogleAccountUseCase.execute(tokenGoogle).subscribe({
      next: (response) => {
      }
    })
  }

  public goToRegister(): void {
    this.navigationService.navigateTo('/auth/register');
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      const {email, password} = this.formLogin.controls;
      this.loginAccountUseCase.execute({email: email.value, password: password.value}).subscribe({
        next: () => {

        }
      })
    }
  }

  private renderGoogleButton(): void {
    const btnContainer = document.getElementById('google-btn');
    if (!btnContainer) return;

    // Limpia el contenedor para evitar múltiples botones al volver
    btnContainer.innerHTML = '';

    google.accounts.id.initialize({
      client_id: '465142946513-7h4aivdjtsqrtm6isiosdisuraoh88rq.apps.googleusercontent.com',
      callback: (response: any) => {
        const jwt = response.credential;
        this.loginWithGoogle(jwt);
      }
    });

    google.accounts.id.renderButton(btnContainer, {
      theme: 'outline',
      size: 'large'
    });

    google.accounts.id.prompt(); // opcional
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
