import {Component, ContentChildren, Input, QueryList, AfterContentInit, EventEmitter, Output} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'app-tab-options',
  templateUrl: './tab-options.component.html',
  styleUrls: ['./tab-options.component.css']
})
export class TabOptionsComponent implements AfterContentInit {
  @Input() value: number = 0;
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() closable: boolean = false;
  @Input() containerClass: string = '';
  @Input() buttonsContainerClass: string = '';
  @Input() contentClass: string = '';

  @Output() tabChanged = new EventEmitter<number>();
  @Output() tabClosed = new EventEmitter<number>();

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    if (this.tabs.length > 0 && this.value === undefined) {
      this.value = this.tabs.first.value;
    }
  }

  selectTab(tabValue: number) {
    this.value = tabValue;
    this.tabChanged.emit(tabValue);
  }

  closeTab(event: Event, tabValue: number) {
    event.stopPropagation();
    this.tabClosed.emit(tabValue);
  }

  getButtonClasses(tab: TabComponent): string {
    const classes = ['tab-button', 'rounded-full', 'px-2', 'py-1'];

    if (this.value === tab.value) {
      classes.push('active');
    }

    if (this.size !== 'normal') {
      classes.push(this.size);
    }

    if (tab.color || this.variant) {
      classes.push(tab.color || this.variant);
    }

    return classes.join(' ');
  }

  getButtonStyles(tab: TabComponent): any {
    const styles: any = {};

    if (tab.color && !['primary', 'success', 'warning', 'danger'].includes(tab.color)) {
      // Color personalizado
      styles.borderColor = tab.color;
      if (this.value === tab.value) {
        styles.backgroundColor = tab.color;
        styles.color = 'white';
      }
    }

    return styles;
  }
}
