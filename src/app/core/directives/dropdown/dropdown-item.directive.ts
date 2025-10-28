import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: '[appDropdownItem]',
  standalone: true
})
export class DropdownItemDirective {
  @Input() value?: any;
  @Input() disabled = false;
  @Input() divider = false;
  @Input() color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';

  constructor(public template: TemplateRef<any>) {}
}
