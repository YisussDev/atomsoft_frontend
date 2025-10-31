import {Component, OnInit} from '@angular/core';
import {AccountEntity} from "@domain/entities/account/account.entity";
import Swal from "sweetalert2";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {NavigationUi} from "@infrastructure/ui/services/navigation/navigation.ui";
import {LogoutAccountUseCase} from "@application/ports/in/auth/logout-account.use-case";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  public isUserMenuOpen: boolean = false;
  public isAppsMenuOpen: boolean = false;

  public account!: AccountEntity;

  public appList: ApplicationEntity[] = [];

  constructor(
    private logoutAccountUseCase: LogoutAccountUseCase,
    private navigationService: NavigationService,
    private navigationUi: NavigationUi,
    private cacheStorage: CacheStorage
  ) {
  }

  ngOnInit() {
    this.initAccountData();
    this.initAppsData();
  }

  private initAppsData(): void {
    setTimeout(() => {
      this.appList = this.cacheStorage.getByKey("_app_list_data");
    }, 1000);
  }

  private initAccountData(): void {
    this.account = this.cacheStorage.getByKey("_account_data");
  }

  public toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  public toggleAppsMenu(): void {
    this.isAppsMenuOpen = !this.isAppsMenuOpen;
  }

  public closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  public closeAppsMenu(): void {
    this.isAppsMenuOpen = false;
  }

  public goToStore(): void {
    this.navigationUi.goToUrl(this.navigationUi.urlAdminPrefix + "store");
    this.isAppsMenuOpen = false;
  }

  public logout(): void {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: "¿Deseas cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "var(--color-primary",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.logoutAccountUseCase.execute().subscribe({
          next: (response) => {
            // console.log(response);
          }
        });
      }
    })
  }

  public goToSettings(): void {
    this.navigationService.navigateTo("/admin/profile/configuration");
  }

  public goToProfile(): void {
    this.navigationService.navigateTo("/admin/profile/detail");
  }

}
