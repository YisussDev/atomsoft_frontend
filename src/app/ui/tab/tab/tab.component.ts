import {AfterViewInit, Component, Input, TemplateRef, ViewChild} from "@angular/core";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
})
export class TabComponent implements AfterViewInit {
  @Input() value!: number;
  @Input() title?: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() badge?: string;
  @Input() color?: string;

  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  ngAfterViewInit() {
  }
}
