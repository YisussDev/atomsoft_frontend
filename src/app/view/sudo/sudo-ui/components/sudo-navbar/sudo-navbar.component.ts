import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    ])
  ],
})
export class SudoNavbarComponent implements OnInit {
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

  ngOnInit() {
    this.isCollapsed = this.defaultCollapsed;
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  public checkMobile() {
    if (window.innerWidth < 1024) {
      this.isCollapsed = true;
    }
  }

  public getAsideClasses(): string {
    return `
      flex flex-col h-screen border-r border-btw bg-btw-secondary w-fit h-screen
      fixed lg:sticky top-0 left-0 z-50 scrollbar-thin
      ${this.isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      transition-transform duration-300
    `;
  }

  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.expandedItems = {};
    }
    this.onCollapseChange.emit(this.isCollapsed);
  }

  public handleItemClick(item: NavItem, index: number) {
    if (item.disabled) return;

    if (item.children && item.children.length > 0 && !this.isCollapsed) {
      this.expandedItems[index] = !this.expandedItems[index];
    } else if (item.route) {
      this.activeParentIndex = index;
      this.activeChildIndex = null;
      this.onNavigate.emit(item);
      if (window.innerWidth < 1024) {
        this.closeMobile();
      }
    }
  }

  public handleChildClick(child: NavItem, parentIndex: number, childIndex: number) {
    if (child.disabled) return;
    this.activeParentIndex = parentIndex;
    this.activeChildIndex = childIndex;
    this.onNavigate.emit(child);
    if (window.innerWidth < 1024) {
      this.closeMobile();
    }
  }

  public getItemClasses(item: NavItem, index: number): string {
    const isActive = this.activeParentIndex === index && this.activeChildIndex === null;
    const baseClasses = 'flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer mb-1';

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
  }

  public closeMobile() {
    this.isMobileOpen = false;
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
