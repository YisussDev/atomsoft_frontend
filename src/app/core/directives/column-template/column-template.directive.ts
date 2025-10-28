import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: '[appColumnTemplate]',
  standalone: true
})
export class ColumnTemplateDirective {
  @Input('appColumnTemplate') columnKey!: string;
  constructor(public template: TemplateRef<any>) {}
}
