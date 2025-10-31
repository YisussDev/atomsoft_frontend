import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {TabInterface} from "@ui/tab/interfaces/tab.interface";

@Component({
  selector: 'app-page-store-home',
  templateUrl: './page-store-home.component.html',
  styleUrls: ['./page-store-home.component.css']
})
export class PageStoreHomeComponent implements OnInit, AfterViewInit {

  public appPrincipal!: ApplicationEntity;

  public appsPraxi: ApplicationEntity[] = [];


  constructor(
    private _cacheStorage: CacheStorage,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initApps();
  }

  private initApps(): void {
    this.appsPraxi = this._cacheStorage.getByKey("_app_list_data");
    this.appPrincipal = this.appsPraxi[0];
  }

  @ViewChild('homeAllApps') homeAllApps!: TemplateRef<any>;
  @ViewChild('homeCommerceApps') homeCommerceApps!: TemplateRef<any>;
  @ViewChild('homeFinancialApps') homeFinancialApps!: TemplateRef<any>;

  public componentTabs: TabInterface[] = [];

  settings = ['Notificaciones', 'Privacidad', 'Seguridad', 'Tema'];

  ngAfterViewInit() {
    this.componentTabs = [
      {
        label: 'Todas las apps',
        content: this.homeAllApps
      },
      {
        label: 'Comercio',
        content: this.homeCommerceApps
      },
      {
        label: 'Finanzas',
        content: this.homeFinancialApps
      }
    ];
    this._cdr.detectChanges();
  }

}
