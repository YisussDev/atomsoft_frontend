import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "@core/services/navigation/navigation.service";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {SudoNavbarComponent} from "@view/sudo/sudo-ui/components/sudo-navbar/sudo-navbar.component";

@Component({
  selector: 'app-pages-sudo',
  templateUrl: './pages-sudo.component.html',
  styleUrls: ['./pages-sudo.component.css']
})
export class PagesSudoComponent implements OnInit {

  @ViewChild('navbar') navbar!: SudoNavbarComponent;

  public currentRoute: string = '';

  public navItems: NavItem[] = []

  public accountData!: AccountEntity;

  constructor(
    private navigationService: NavigationService,
    private _cacheStorage: CacheStorage
  ) {
  }

  ngOnInit() {
    this.initDataAccount();
    this.configureAsideNav();
  }

  private configureAsideNav(): void {
    this.navItems = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/sudo/home'
      },
      {
        label: 'Cuentas',
        icon: 'group',
        children: [
          {label: 'Todos las cuentas', icon: 'list', route: '/sudo/account/list'},
          {label: 'Crear Cuenta', icon: 'add', route: '/sudo/account/create'},
        ]
      },
      {
        label: 'Aplicaciones',
        icon: 'apps',
        children: [
          {label: 'Todos las Aplicaciones', icon: "list", route: '/sudo/application/list'},
          {label: 'Crear Aplicación', icon: 'add', route: '/sudo/application/create'},
        ]
      },
      // {
      //   label: 'Empresas',
      //   icon: 'apartment',
      //   children: [
      //     {label: 'Todos los productos', icon: '📦', route: '/productos/todos'},
      //     {label: 'Categorías', icon: '🏷️', route: '/productos/categorias'},
      //     {label: 'Inventario', icon: '📋', route: '/productos/inventario', badge: '3'},
      //     {label: 'Ofertas', icon: '🎁', route: '/productos/ofertas'}
      //   ]
      // },
      // {
      //   label: 'Ordenes',
      //   icon: 'receipt',
      //   children: [
      //     {label: 'Todos los productos', icon: '📦', route: '/productos/todos'},
      //     {label: 'Categorías', icon: '🏷️', route: '/productos/categorias'},
      //     {label: 'Inventario', icon: '📋', route: '/productos/inventario', badge: '3'},
      //     {label: 'Ofertas', icon: '🎁', route: '/productos/ofertas'}
      //   ]
      // },
      {label: "", divider: true},
    ];
  }

  public handleNavigation(item: NavItem): void {
    this.currentRoute = item.route || item.label;
    this.navigationService.navigateTo(item.route || "/sudo");
  }

  public handleCollapseChange(isCollapsed: boolean): void {
  }

  private initDataAccount(): void {
    this.accountData = this._cacheStorage.getByKey("_account_data");
  }

  toggleMobileMenu() {
    if (this.navbar) {
      this.navbar.openMobile();
    }
  }


}


interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
  divider?: boolean;
}
