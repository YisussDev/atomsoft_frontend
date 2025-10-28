import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {TabInterface} from "@ui/tab/interfaces/tab.interface";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() tabs: TabInterface[] = [];
  @Input() defaultTab: number = 0;
  @Input() variant: 'line' | 'pills' | 'enclosed' = 'line';
  @Input() color: 'blue' | 'purple' | 'green' | "default" = 'default';
  @Input() fullWidth: boolean = false;
  @Input() navigable: boolean = false;
  @Input() className: string = '';

  @Output() onChange = new EventEmitter<{ index: number, tab: TabInterface }>();

  activeTab: number = 0;

  private colorClasses = {
    default: {
      active: 'text-btw border-btw bg-btw-secondary',
      inactive: 'text-btw hover:text-blue-600 hover:bg-gray-50',
      indicator: 'bg-blue-600'
    },
    blue: {
      active: 'text-blue-600 border-blue-600 bg-blue-50',
      inactive: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
      indicator: 'bg-blue-600'
    },
    purple: {
      active: 'text-purple-600 border-purple-600 bg-purple-50',
      inactive: 'text-btw hover:text-purple-600 hover:bg-gray-50',
      indicator: 'bg-purple-600'
    },
    green: {
      active: 'text-green-600 border-green-600 bg-green-50',
      inactive: 'text-btw hover:text-green-600 hover:bg-gray-50',
      indicator: 'bg-green-600'
    }
  };

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.activeTab = this.defaultTab;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes["tabs"].currentValue) {
        this.tabs = changes["tabs"].currentValue;
        this._cdr.detectChanges();
      }
    }
  }

  public handleTabClick(index: number, tab: TabInterface) {
    if (tab.disabled) return;

    if (this.navigable && tab.href) {
      window.location.href = tab.href;
      return;
    }

    this.activeTab = index;
    this.onChange.emit({index, tab});
  }

  public getHeaderClasses(): string {
    const base = `flex ${this.fullWidth ? 'w-full' : ''}`;

    if (this.variant === 'line') {
      return `${base} border-b-2 border-btw`;
    }
    if (this.variant === 'pills') {
      return `${base} gap-2 bg-gray-100 p-1 rounded-full`;
    }
    if (this.variant === 'enclosed') {
      return `${base} gap-1`;
    }

    return base;
  }

  public getTabClasses(index: number): string {
    const isActive = this.activeTab === index;
    const colors = this.colorClasses[this.color];
    const baseClasses = 'flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 cursor-pointer';

    if (this.variant === 'line') {
      return `${baseClasses} border-b-2 ${
        isActive
          ? `${colors.active} border-current`
          : `${colors.inactive} border-transparent`
      }`;
    }

    if (this.variant === 'pills') {
      return `${baseClasses} rounded-full ${
        isActive
          ? colors.active
          : colors.inactive
      }`;
    }

    if (this.variant === 'enclosed') {
      return `${baseClasses} rounded-t-lg border-2 border-b-0 ${
        isActive
          ? `${colors.active} border-current`
          : `${colors.inactive} border-transparent`
      }`;
    }

    return baseClasses;
  }

  public isTemplate(content: any): boolean {
    return content?.createEmbeddedView !== undefined;
  }

}
