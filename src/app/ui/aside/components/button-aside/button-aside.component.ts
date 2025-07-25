import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-button-aside',
  templateUrl: './button-aside.component.html',
  styleUrls: ['./button-aside.component.css']
})
export class ButtonAsideComponent {

  @Output() public actionAside: EventEmitter<boolean> = new EventEmitter<boolean>();

  public clickButton(): void {
    this.actionAside.emit();
  }

}
