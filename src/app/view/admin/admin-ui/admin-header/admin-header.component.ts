import {Component, OnInit} from '@angular/core';
import {LogoutAccountUseCase} from "@application/use-cases/account/logout-account.use-case";
import {CacheStorage} from "@infrastructure/adapters/storage/cache/cache.storage";
import {AccountEntity} from "@domain/entities/account/account.entity";
import Swal from "sweetalert2";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  public isUserMenuOpen: boolean = false;

  public account!: AccountEntity;

  constructor(
    private logoutAccountUseCase: LogoutAccountUseCase,
    private navigationService: NavigationService,
    private cacheStorage: CacheStorage
  ) {
  }

  ngOnInit() {
    this.initAccountData();
  }

  private initAccountData(): void {
    this.account = this.cacheStorage.getByKey("_account_data");
  }

  public toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  public closeUserMenu(): void {
    this.isUserMenuOpen = false;
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
            console.log(response);
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
