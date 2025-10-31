import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sudo-navbar',
  templateUrl: './sudo-navbar.component.html',
  styleUrls: ['./sudo-navbar.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({height: '0px', opacity: 0, overflow: 'hidden'})),
      state('*', style({height: '*', opacity: 1, overflow: 'hidden'})),
      transition('void <=> *', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('rotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('collapsed <=> expanded', animate('200ms ease-in-out'))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class SudoNavbarComponent implements OnInit, OnDestroy {
  @Input() navItems: NavItem[] = [];
  @Input() appName: string = 'PraxiSoft©';
  @Input() appInitial: string = 'A';
  @Input() userName: string = 'Usuario';
  @Input() userRole: string = 'Rol';
  @Input() userInitial: string = 'U';
  @Input() expandedWidth: number = 250;
  @Input() collapsedWidth: number = 70;
  @Input() defaultCollapsed: boolean = false;

  @Output() onNavigate = new EventEmitter<NavItem>();
  @Output() onCollapseChange = new EventEmitter<boolean>();

  public isCollapsed: boolean = false;
  public isMobileOpen: boolean = false;
  public expandedItems: { [key: number]: boolean } = {};
  public activeParentIndex: number | null = null;
  public activeChildIndex: number | null = null;
  public isMobile: boolean = false;

  // Para el submenu flotante cuando está colapsado
  public hoveredParentIndex: number | null = null;
  public submenuPosition = { top: 0, left: 0 };

  private resizeListener: any;

  ngOnInit() {
    this.checkMobile();
    this.isCollapsed = this.isMobile ? true : this.defaultCollapsed;

    this.resizeListener = () => this.checkMobile();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  public checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024;

    // Si cambiamos de móvil a desktop, restaurar estado
    if (wasMobile && !this.isMobile) {
      this.isCollapsed = this.defaultCollapsed;
      this.isMobileOpen = false;
    }

    // En móvil siempre colapsado cuando no está abierto
    if (this.isMobile && !this.isMobileOpen) {
      this.isCollapsed = true;
    }
  }

  public getAsideClasses(): string {
    const mobileClasses = this.isMobile
      ? 'fixed w-64 h-screen shadow-2xl'
      : 'relative';

    const visibilityClasses = this.isMobile
      ? (this.isMobileOpen ? 'translate-x-0' : '-translate-x-full')
      : 'translate-x-0';

    return `
      flex flex-col border-r border-btw bg-white
      ${mobileClasses} top-0 left-0 z-50 scrollbar-thin
      transition-all duration-300 ease-in-out
      ${visibilityClasses}
    `.trim();
  }

  public toggleCollapse() {
    // En móvil, abrir el menú completo
    if (this.isMobile) {
      this.isMobileOpen = !this.isMobileOpen;
      this.isCollapsed = false;
    } else {
      // En desktop, colapsar/expandir
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
        this.expandedItems = {};
      }
    }
    this.onCollapseChange.emit(this.isCollapsed);
  }

  public handleItemClick(item: NavItem, index: number, event?: MouseEvent) {
    if (item.disabled) return;

    // Si tiene hijos y no está en mobile
    if (item.children && item.children.length > 0) {
      if (this.isCollapsed && !this.isMobile) {
        // Mostrar submenu flotante
        this.showFloatingSubmenu(index, event);
      } else {
        // Toggle expandir/contraer
        this.expandedItems[index] = !this.expandedItems[index];
      }
    } else if (item.route) {
      // Navegar
      this.activeParentIndex = index;
      this.activeChildIndex = null;
      this.onNavigate.emit(item);
      if (this.isMobile) {
        this.closeMobile();
      }
    }
  }

  public handleChildClick(child: NavItem, parentIndex: number, childIndex: number) {
    if (child.disabled) return;
    this.activeParentIndex = parentIndex;
    this.activeChildIndex = childIndex;
    this.onNavigate.emit(child);
    this.hoveredParentIndex = null; // Cerrar submenu flotante
    if (this.isMobile) {
      this.closeMobile();
    }
  }

  public showFloatingSubmenu(index: number, event?: MouseEvent) {
    if (!this.isCollapsed || this.isMobile) return;

    this.hoveredParentIndex = index;

    if (event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.submenuPosition = {
        top: rect.top,
        left: rect.right
      };
    }
  }

  public hideFloatingSubmenu() {
    this.hoveredParentIndex = null;
  }

  public getItemClasses(item: NavItem, index: number): string {
    const isActive = this.activeParentIndex === index && this.activeChildIndex === null;
    const baseClasses = 'flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer mb-1 relative';

    if (item.disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed`;
    }

    if (isActive) {
      return `${baseClasses} bg-blue-50 text-blue-600 hover:bg-blue-100`;
    }

    return `${baseClasses} text-btw hover:bg-gray-100 hover:text-primary`;
  }

  public getChildClasses(child: NavItem, parentIndex: number, childIndex: number): string {
    const isActive = this.activeParentIndex === parentIndex && this.activeChildIndex === childIndex;
    const baseClasses = 'flex items-center px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer';

    if (child.disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed`;
    }

    if (isActive) {
      return `${baseClasses} bg-blue-50 text-blue-600 hover:bg-blue-100`;
    }

    return `${baseClasses} text-gray-600 hover:bg-gray-100`;
  }

  public openMobile() {
    this.isMobileOpen = true;
    this.isCollapsed = false; // Mostrar expandido en móvil
  }

  public closeMobile() {
    this.isMobileOpen = false;
    this.expandedItems = {};
  }

  public hasActiveChild(item: NavItem, index: number): boolean {
    return this.activeParentIndex === index && this.activeChildIndex !== null;
  }
}

export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
  divider?: boolean;
}
