import {Directive, TemplateRef} from "@angular/core";

@Directive({
  selector: '[appDropdownFooter]',
  standalone: true
})
export class DropdownFooterDirective {
  constructor(public template: TemplateRef<any>) {}
}
