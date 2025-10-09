import {inject, Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {VerifyAccountUseCase} from "@application/use-cases/account/verify-account.use-case";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";

@Injectable()
export class AdminGuard {
  private useHttp: boolean = environment.useHttpRepository;

  constructor(
    private cacheStorage: CacheStorage,
    private verifyAccountUseCase: VerifyAccountUseCase,
    private navigationService: NavigationService,
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

    return this.verifyAccountUseCase.execute().pipe(
      map(() => true), // si la verificación es exitosa, permite acceso
      catchError(() => {
        localStorage.removeItem("x-token");
        this.navigationService.navigateTo('/auth/login').then();
        return of(false); // bloquea si falla
      })
    );
  }

}
