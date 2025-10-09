import {Inject, Injectable} from "@angular/core";
import {AccountRepository} from "@domain/repositories/account/account.repository";
import {map, mergeMap, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AccountRepositoryPort} from "@application/ports/out/account/account.repository.port";

@Injectable()
export class CloseSessionAccountUseCase {

  constructor(
    @Inject("AccountRepositoryPort")
    private readonly repository: AccountRepositoryPort,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
  ) {
  }

  public execute(username: string, idSession: string): Observable<{ message: string }> {
    return this.repository.closeSession(username, idSession).pipe(
      tap((response) => {
        this.notificationService.success("Session closed successfully!");
      })
    )
  }

}
