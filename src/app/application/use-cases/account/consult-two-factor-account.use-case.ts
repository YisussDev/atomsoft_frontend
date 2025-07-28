import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {CacheStorage} from "@infrastructure/adapters/storage/cache/cache.storage";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {SocketService} from "@infrastructure/ports/socket/services/socket.service";

@Injectable()
export class ConsultTwoFactorAccountUseCase {

  constructor(
    @Inject("AccountRepository")
    private readonly repository: AccountRepository,
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
