import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AuthRepositoryPort} from "@application/ports/out/auth/auth.repository.port";

@Injectable()
export class CloseSessionAccountUseCase {

  constructor(
    @Inject("AuthRepositoryPort")
    private readonly repository: AuthRepositoryPort,
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
