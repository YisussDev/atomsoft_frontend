import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SwitchOptionInterface} from "../interfaces/switch-option.interface";

@Component({
  selector: 'app-switch-simple',
  templateUrl: './switch-simple.component.html',
  styleUrls: ['./switch-simple.component.css']
})
export class SwitchSimpleComponent {

  @Input() public options: SwitchOptionInterface[] = [];
  @Input() public activeValue: string = '';
  @Input() public showLabel: boolean = false;
  @Output() public changed = new EventEmitter<string>();

  setActive(value: string) {
    this.activeValue = value;
    this.changed.emit(value);
  }

}
