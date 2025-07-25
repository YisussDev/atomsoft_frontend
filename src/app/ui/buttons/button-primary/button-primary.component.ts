import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.css']
})
export class ButtonPrimaryComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() public loading!: boolean;
  @Input() public label!: string;
  @Input() public icon: string = '';
  @Input() public data: any;
  @Input() public disabled: boolean = false;
  @Input() public rigthIcon: boolean = false;
  @Input() public colorButton!: string;

  eventClick(data: any): void {
    if (this.disabled) return;
    this.clickEvent.emit(data);
  }
}
