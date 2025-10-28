import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {catchError} from "rxjs/operators";
import {ConsultTwoFactorAccountUseCase} from "@application/ports/in/auth/consult-two-factor-account.use-case";

@Injectable()
export class TwoFactorGuard {

  private useHttp: boolean = environment.useHttpRepository;

  constructor(
    private navigationService: NavigationService,
    private consultTwoFactorAccountUseCase: ConsultTwoFactorAccountUseCase,
  ) {
  }

  canActivate(): Observable<boolean> {
    if (!this.useHttp) {
      return of(true);
    }

    const token: string | null = localStorage.getItem("x-token");
    if (!token) {
      this.navigationService.navigateTo('/auth/login').then();
      return of(false);
    }

    return this.consultTwoFactorAccountUseCase.execute().pipe(
      map((response) => {
        if (response.twoFactorCompleted == 1) {
          this.navigationService.navigateTo('/admin');
          return false;
        } else {
          return true;
        }
      }),
      catchError(() => {
        localStorage.removeItem("x-token");
        this.navigationService.navigateTo('/auth/login').then();
        return of(false); // bloquea si falla
      })
    );
  }

}
