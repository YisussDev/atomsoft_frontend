import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {Subject} from "rxjs";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";

@Component({
  selector: 'app-home-banners-last',
  templateUrl: './home-banners-last.component.html',
  styleUrls: ['./home-banners-last.component.css']
})
export class HomeBannersLastComponent implements OnInit, AfterViewInit, OnDestroy {

  public appList: ApplicationEntity[] = [];

  public destroy$: Subject<void> = new Subject<void>();


  constructor(
    private _cdr: ChangeDetectorRef,
    private _cacheStorage: CacheStorage,
    private navigationUi: NavigationUi
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initAppList();
  }

  private initAppList(): void {
    this.appList = this._cacheStorage.getByKey("_app_list_data") || [];
    this._cdr.detectChanges();
    this._cacheStorage.changeData.subscribe(event => {
      if (event.key == "_app_list_data") {
        this.appList = event.data;
        this._cdr.detectChanges();
      }
    });
  }

  public goToApp(app_code: string): void {
    this.navigationUi.goToUrl(this.navigationUi.urlAdminPrefix + "store" + "/" + app_code);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
