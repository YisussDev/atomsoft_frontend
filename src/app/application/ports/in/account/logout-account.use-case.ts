import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class LogoutAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(): Observable<void> {
    return this.repository.logout().pipe(
      tap((response) => {
          localStorage.removeItem('x-token');
          this.notificationService.success("Logout successfully!");
          this.navigationService.navigateTo("/auth/login").then();
        }
      ),
      catchError((error: HttpErrorResponse) => {
        localStorage.removeItem('x-token');
        this.navigationService.navigateTo("/auth/login").then();
        throw error;
      })
    )
  }

}
