import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FindAllApplicationUseCase} from "@application/ports/in/application/find-all-application.use-case";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {AccountEventsRepository} from "@infrastructure/adapters/in/socket/events/account/account.events.repository";
import {SocketService} from "@infrastructure/adapters/in/socket/services/socket.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  public loading: boolean = true;

  private $destroy: Subject<void> = new Subject<void>();

  constructor(
    private socketService: SocketService,
    private accountEventsRepository: AccountEventsRepository,
    private findAllApplicationUseCase: FindAllApplicationUseCase,
    private _cacheStorage: CacheStorage,
  ) {
  }

  ngOnInit() {
    // this.initSocket();
    // this.initListenCloseSession();
    this.initApps();
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  private initApps(): void {
    this.findAllApplicationUseCase.execute({}).subscribe({
      next: (response) => {
        this._cacheStorage.setByKey("_app_list_data", response.data);
      }
    });
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
