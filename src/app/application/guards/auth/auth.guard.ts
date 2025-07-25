import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Injectable()
export class AuthGuard {

  private useHttp: boolean = environment.useHttpRepository;

  constructor(
    private navigationService: NavigationService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.useHttp) {
      return of(true);
    }

    const token = localStorage.getItem("x-token");

    if (token) {
      this.navigationService.navigateTo('/admin');
      return of(false);
    }

    return of(true);
  }
}
