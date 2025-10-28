import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component, ContentChildren,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output, QueryList, TemplateRef,
  ViewChild
} from '@angular/core';
import {ActionEvent} from "@core/interfaces/actions/action.interface";
import {DropdownItemDirective} from "@core/directives/dropdown/dropdown-item.directive";
import {DropdownTriggerDirective} from "@core/directives/dropdown/dropdown-trigger.directive";
import {DropdownFooterDirective} from "@core/directives/dropdown/dropdown-footer.directive";

@Component({
  selector: 'app-button-dropdown',
  templateUrl: './button-dropdown.component.html',
  styleUrls: ['./button-dropdown.component.css']
})
export class ButtonDropdownComponent implements AfterContentInit {
  // Props para el botón default
  @Input() label: string | null = null;
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() iconLeft?: string;
  @Input() badge?: string | number;
  @Input() loading = false;

  // Props generales
  @Input() position: 'left' | 'right' | 'center' = 'left';
  @Input() disabled = false;
  @Input() searchable = false;
  @Input() multiple = false;
  @Input() minWidth = '200px';
  @Input() maxHeight?: string;
  @Input() backdrop = false;
  @Input() closeOnSelect = true;

  @Output() itemSelected = new EventEmitter<any>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ContentChildren(DropdownItemDirective) items!: QueryList<DropdownItemDirective>;
  @ContentChildren(DropdownTriggerDirective) triggers!: QueryList<DropdownTriggerDirective>;
  @ContentChildren(DropdownFooterDirective) footers!: QueryList<DropdownFooterDirective>;

  isOpen = false;
  searchTerm = '';
  selectedItems: any[] = [];

  triggerTemplate?: TemplateRef<any>;
  itemTemplates: DropdownItemDirective[] = [];
  footerTemplate?: TemplateRef<any>;
  emptyTemplate?: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    // Obtener el template del trigger
    this.triggerTemplate = this.triggers.first?.template;

    // Obtener el template del footer
    this.footerTemplate = this.footers.first?.template;

    // Cargar items iniciales
    this.updateItemTemplates();

    // Observar cambios en items
    this.items.changes.subscribe(() => {
      this.updateItemTemplates();
    });
  }

  public updateItemTemplates() {
    this.itemTemplates = this.items.toArray();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  public toggleDropdown() {
    if (this.disabled || this.loading) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  public closeDropdown() {
    this.isOpen = false;
    this.searchTerm = '';
    this.closed.emit();
  }

  public selectItem(item: DropdownItemDirective) {
    if (item.disabled) return;

    if (this.multiple) {
      const index = this.selectedItems.findIndex(i => i === item.value);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item.value);
      }
      this.itemSelected.emit([...this.selectedItems]);
    } else {
      this.itemSelected.emit(item.value);
      if (this.closeOnSelect) {
        this.closeDropdown();
      }
    }
  }

  public isSelected(item: DropdownItemDirective): boolean {
    return this.selectedItems.includes(item.value);
  }

  public clearSelection() {
    this.selectedItems = [];
    this.itemSelected.emit([]);
  }

  public getButtonClasses(): string {
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-3'
    };

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      outline: 'bg-transparent text-btw border-2 border-btw hover:bg-gray-50 focus:ring-gray-500'
    };

    return `${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }

  public getMenuPositionClasses(): string {
    const positions = {
      left: 'left-0',
      right: 'right-0',
      center: 'left-1/2 transform -translate-x-1/2'
    };
    return positions[this.position];
  }

  public getItemClasses(item: DropdownItemDirective): string {
    const baseClasses = 'hover:bg-gray-100';

    if (item.color) {
      const colorClasses = {
        primary: 'text-blue-600 hover:bg-blue-50',
        success: 'text-green-600 hover:bg-green-50',
        danger: 'text-red-600 hover:bg-red-50',
        warning: 'text-yellow-600 hover:bg-yellow-50',
        info: 'text-cyan-600 hover:bg-cyan-50'
      };
      return colorClasses[item.color];
    }

    return baseClasses;
  }

  public getIconPath(iconName?: string): string {
    const icons: Record<string, string> = {
      user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      logout: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
      edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      check: 'M5 13l4 4L19 7',
      download: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      share: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
      filter: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2.586a1 1 0 01-.293.707l-4.414 4.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
      plus: 'M12 4v16m8-8H4',
      bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
    };
    return icons[iconName || ''] || icons["user"];
  }
}
