import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ThemeService} from "@core/services/theme/theme.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {CreateAccountUseCase} from "@application/ports/in/account/create-account.use-case";
import {NotificationService} from "@core/services/notification/notification.service";

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
    private createAccountUseCase: CreateAccountUseCase,
    private navigationService: NavigationService,
    private notificationService: NotificationService,
    private _formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.initListenTheme();
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
      email: ["paguayjesus+test1@gmail.com", Validators.required],
      password: ["123asd123@A", [Validators.required]],
      password_confirmation: ["123asd123@A", [Validators.required]],
    })
  }

  public onSubmit(): void {
    if (this.formRegister.valid) {
      this.createAccountUseCase.execute(this.formRegister.value).subscribe({
        next: (response) => {
          localStorage.setItem('x-token', response.token);
          this.notificationService.success("Login successfully!");
          if (response.is_two_factor == 1) {
            this.navigationService.navigateTo("/auth/two-factor-auth").then();
          } else {
            this.navigationService.navigateTo("/admin").then();
          }
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
