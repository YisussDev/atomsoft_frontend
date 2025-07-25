import {Injectable} from "@angular/core";
import {SocketService} from "@infrastructure/ports/socket/services/socket.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {NotificationService} from "@core/services/notification/notification.service";
import {NavigationService} from "@core/services/navigation/navigation.service";

declare const google: any;

@Injectable({
  providedIn: "root",
})
export class AccountEventsRepository {

  constructor(
    private socketService: SocketService,
    private notificationService: NotificationService,
    private navigationService: NavigationService
  ) {
  }

  public listenCloseSessionAccount(): Observable<{ idSession: string }> {
    return this.socketService.listen("account:close-session").pipe(
      tap(({idSession}) => {
        localStorage.removeItem("x-token");
        this.socketService.disconnect();
        this.navigationService.navigateTo("/auth/login").then();
        google.accounts.id.disableAutoSelect();
        this.notificationService.info("Your session has been closed successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
    );
  }

}
