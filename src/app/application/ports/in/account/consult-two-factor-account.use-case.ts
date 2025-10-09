import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";

@Injectable()
export class ConsultTwoFactorAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private cacheStorage: CacheStorage,
    private notificationService: NotificationService
  ) {
  }

  public execute(): Observable<{ twoFactorCompleted: 0 | 1; }> {
    return new Observable<void>((subscriber) => {
      const token = localStorage.getItem("x-token");
      if (!token) {
        subscriber.error(new Error("Token not found"));
      } else {
        subscriber.next();
        subscriber.complete();
      }
    }).pipe(
      mergeMap(() => {
        return this.repository.consultTwoFactor().pipe(
          tap((response) => {
          })
        );
      }),
      catchError((error: any) => {
        if ((error instanceof Error)) {
          this.notificationService.error(`Error de dominio..., ${error.message}`);
        } else {
          this.notificationService.error('Ocurrió un error inesperado');
        }
        return throwError(() => error);
      })
    );

  }

}
