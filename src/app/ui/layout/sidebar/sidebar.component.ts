import {
  Component, NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {SidebarService} from "./services/sidebar.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ConfigCompanieInterface} from "@domain-entities/setting/company.entity";
import {CacheStorage} from "../../../infrastructure/storage/cache/cache.storage";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public visible: boolean = false;
  public title: string = '';
  public closing: boolean = false;

  public companyData!: ConfigCompanieInterface;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private cacheStorage: CacheStorage,
    private sidebarService: SidebarService,
    private ngZone: NgZone,
    private _router: Router
  ) {
  }

  ngOnInit() {
    // this.initListenOpenClose();
    this.initConfigCompany();
    this.listenEvents();
  }

  private initConfigCompany(): void {
    this.companyData = this.cacheStorage.getByKey('_company_config');
  }

  private listenEvents(): void {
    this.sidebarService.openSidebarEmit.pipe(takeUntil(this._subscriber)).subscribe(data => {
      this.ngZone.run(() => {
        this.visible = true;
      });
    })
    this.sidebarService.closeSidebarEmit.pipe(takeUntil(this._subscriber)).subscribe(data => {
      this.closing = true;
      setTimeout(() => {
        this.visible = false;
        this.closing = false;
      }, 300)
    })
  }

  public closeAside(): void {
    this.sidebarService.closeSidebar();
  }

  public goToModule(name_module: string): void {
    this._router.navigateByUrl(`/back-office/${name_module}`);
    this.closeAside();
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
