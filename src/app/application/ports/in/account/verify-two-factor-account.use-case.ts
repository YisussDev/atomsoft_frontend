import {Inject, Injectable} from "@angular/core";
import {mergeMap, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class VerifyTwoFactorAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(otp: string): Observable<{ validTwoFactor: 0 | 1; }> {
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
        return this.repository.verifyTwoFactor(otp).pipe(
          tap((response) => {
            if (response.validTwoFactor == 1) {
              this.notificationService.success("Validate two factor account!");
              this.navigationService.navigateTo("/admin").then();
            } else {
              this.notificationService.info("Validate two factor error!");
            }
          })
        );
      }),
      catchError((error: any) => {
        this.notificationService.info("Session closed for security!");
        return throwError(() => error);
      })
    );

  }

}
