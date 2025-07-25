import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionEvent} from "@core-interfaces/actions/action.interface";

@Component({
  selector: 'app-header-quickly-action',
  templateUrl: './header-quickly-action.component.html',
  styleUrls: ['./header-quickly-action.component.css']
})
export class HeaderQuicklyActionComponent {

  @Input() public actionsHeaderQuicklyConfig: ActionEvent[] = [];

  @Output() public actionEmitter: EventEmitter<string> = new EventEmitter<string>();

  public clickOption(event: string): void {
    this.actionEmitter.emit(event);
  }

}
