import {Directive, TemplateRef} from "@angular/core";

@Directive({
  selector: '[appDropdownTrigger]',
  standalone: true
})
export class DropdownTriggerDirective {
  constructor(public template: TemplateRef<any>) {}
}
