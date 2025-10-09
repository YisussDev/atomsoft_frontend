import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {
  @Input() public text: string = "default";
  @Input() public className: string = "";

}
