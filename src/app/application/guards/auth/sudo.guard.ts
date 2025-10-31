import {VerifyAccountUseCase} from "@application/ports/in/auth/verify-account.use-case";
import {Injectable} from "@angular/core";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {environment} from "../../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class SudoGuard {

  constructor(
    private verifyAccountUseCase: VerifyAccountUseCase,
    private navigationService: NavigationService,
  ) {
  }

  canActivate(): Observable<boolean> {
    if (!environment.useHttpRepository) {
      return of(true);
    }

    const token = localStorage.getItem("x-token");
    if (!token) {
      this.navigationService.navigateTo('/auth/login').then();
      return of(false);
    }

    return this.verifyAccountUseCase.execute().pipe(
      map(response => {
        // return true;
        if (response.account.roles.includes("sudo")) {
          return true;
        } else {
          this.navigationService.navigateTo("/admin/");
          return false;
        }
      }),
      catchError(err => {
        console.error('SudoGuard error:', err);
        localStorage.removeItem("x-token");
        this.navigationService.navigateTo('/auth/login').then();
        return of(false);
      })
    );
  }

}
