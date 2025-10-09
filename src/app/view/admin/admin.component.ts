import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "@infrastructure/ports/socket/services/socket.service";
import {AccountEventsRepository} from "@infrastructure/ports/socket/events/account/account.events.repository";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  private $destroy: Subject<void> = new Subject<void>();

  constructor(
    private socketService: SocketService,
    private accountEventsRepository: AccountEventsRepository
  ) {
  }

  ngOnInit() {
    // this.initSocket();
    // this.initListenCloseSession();
  }

  private initSocket(): void {
    const token = localStorage.getItem("x-token");
    const session = localStorage.getItem("x-session");
    if (token && session) {
      this.socketService.init(token, session);
    }
  }

  private initListenCloseSession(): void {
    this.accountEventsRepository.listenCloseSessionAccount().pipe(
      takeUntil(this.$destroy)
    ).subscribe();
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
