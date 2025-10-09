import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";

@Injectable()
export class VerifyAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private cacheStorage: CacheStorage,
    private notificationService: NotificationService
  ) {
  }

  public execute(): Observable<{ token: string; account: AccountEntity & { jti: string } }> {
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
        return this.repository.verify().pipe(
          tap((response) => {
            localStorage.setItem('x-token', response.token);
            localStorage.setItem('x-session', response.account.jti);
            this.cacheStorage.setByKey("_account_data", response.account);
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
