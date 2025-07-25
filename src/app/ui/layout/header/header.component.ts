import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "@core-services/routes/route.service";
import {SidebarService} from "../sidebar/services/sidebar.service";
import {ConfigCompanieInterface} from "@domain-entities/setting/company.entity";
import {RouteItemGeneral} from "@core-interfaces/routes/route-item-general.interface";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {routesGeneral} from "../../../application/routes/routes-general";
import {UserEntity} from "@domain-entities/user/user.entity";
import {CacheStorage} from "../../../infrastructure/storage/cache/cache.storage";
import {LogoutUserUseCase} from "@application-use-cases/user/logout-user-use-case";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  private routesGeneral: { [key: string]: RouteItemGeneral } = routesGeneral;
  public breadcrumbs: string[] = [];
  public title: string | undefined = '';
  public breadcrumbTransformed: string = '';
  public companyData!: ConfigCompanieInterface;
  public accountData!: UserEntity;
  public isVisible: boolean = false;
  public overflowValue: number = 0;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private cacheStorage: CacheStorage,
    private sidebarService: SidebarService,
    private routeService: RouteService,
    private logoutUserUseCase: LogoutUserUseCase,
    private toastrService: ToastrService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initConfigCompany();
    this.getDataRoute();
    this.initDataUser();
  }

  private initConfigCompany(): void {
    this.companyData = this.cacheStorage.getByKey('_company_config');
  }

  private initDataUser(): void {
    this.accountData = this.cacheStorage.getByKey('_user_data');
  }

  public openSidebar(): void {
    this.sidebarService.openSidebar();
  }

  public openInfoSession(): void {
    // this.modalService.openModal(
    //   ViewDataSessionComponent,
    //   `${this.accountData.username}`,
    //   '',
    //   undefined,
    //   undefined,
    //   this.accountData,
    // )
  }

  public getDataRoute(): void {
    this.routeService.sendDataRoute.pipe(
      takeUntil(this._subscriber)
    ).subscribe(routeArguments => {
      if (routeArguments.breadcrumbs) {
        this.breadcrumbs = routeArguments.breadcrumbs;
        this.constructBreadcrumb(this.breadcrumbs);
      }
      if (routeArguments.title) {
        this.title = routeArguments.title;
      }
    })
  }

  public constructBreadcrumb(breadcrumbs: string[]): void {
    const codeBreadcrumbLast = breadcrumbs[breadcrumbs.length - 1];
    this.breadcrumbTransformed = routesGeneral[codeBreadcrumbLast].name;
  }

  public openBox(): void {
    this.isVisible = !this.isVisible;
  }

  public overflowDetect(value: number): void {
    this.overflowValue = value;
  }

  public clickOutside(): void {
    this.isVisible = false;
  }

  public closeSession(): void {
    this.isVisible = false;
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Desea cerrar sesión?',
      confirmButtonText: 'Cerrar sesión',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--color-primary)',
    }).then(result => {
      if (result.isConfirmed) {
        this.logoutUserUseCase.execute().subscribe({
          next: () => {
            localStorage.removeItem('data-account');
            localStorage.removeItem('x-config');
            localStorage.removeItem('x-token');
            this.toastrService.info('Has cerrado sesión correctamente.', 'Cierre de sesión');
            this._router.navigateByUrl('/auth/login');
          }
        })
      }
    })
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }


}
