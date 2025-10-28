import {Component} from '@angular/core';
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-pages-sudo',
  templateUrl: './pages-sudo.component.html',
  styleUrls: ['./pages-sudo.component.css']
})
export class PagesSudoComponent {

  public currentRoute: string = '';

  public navItems: NavItem[] = [
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
        {label: 'Todos los productos', icon: '📦', route: '/productos/todos'},
        {label: 'Categorías', icon: '🏷️', route: '/productos/categorias'},
        {label: 'Inventario', icon: '📋', route: '/productos/inventario', badge: '3'},
        {label: 'Ofertas', icon: '🎁', route: '/productos/ofertas'}
      ]
    },
    {
      label: 'Empresas',
      icon: 'apartment',
      children: [
        {label: 'Todos los productos', icon: '📦', route: '/productos/todos'},
        {label: 'Categorías', icon: '🏷️', route: '/productos/categorias'},
        {label: 'Inventario', icon: '📋', route: '/productos/inventario', badge: '3'},
        {label: 'Ofertas', icon: '🎁', route: '/productos/ofertas'}
      ]
    },
    {
      label: 'Ordenes',
      icon: 'receipt',
      children: [
        {label: 'Todos los productos', icon: '📦', route: '/productos/todos'},
        {label: 'Categorías', icon: '🏷️', route: '/productos/categorias'},
        {label: 'Inventario', icon: '📋', route: '/productos/inventario', badge: '3'},
        {label: 'Ofertas', icon: '🎁', route: '/productos/ofertas'}
      ]
    },
    {label: "", divider: true},
  ];

  constructor(
    private navigationService: NavigationService,
  ) {
  }

  public handleNavigation(item: NavItem): void {
    this.currentRoute = item.route || item.label;
    console.log(item.route)
    this.navigationService.navigateTo(item.route || "/sudo");
  }

  public handleCollapseChange(isCollapsed: boolean): void {
    console.log('Estado colapsado:', isCollapsed);
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
