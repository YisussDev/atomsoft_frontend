import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-generic',
  templateUrl: './button-generic.component.html',
  styleUrls: ['./button-generic.component.css']
})
export class ButtonGenericComponent {

  @Input() public type: 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'LINK' = 'PRIMARY';
  @Input() public fill: boolean = true;
  @Input() public loading!: boolean;
  @Input() public label!: string;
  @Input() public icon: string = '';
  @Input() public disabled: boolean = false;
  @Input() public rightIcon: boolean = false;
  @Input() public colorButton!: string;
  @Input() public path!: string;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();


  public eventClick(): void {
    if (this.disabled) return;
    this.clickEvent.emit();
  }
}
