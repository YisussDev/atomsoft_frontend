import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon-fa',
  templateUrl: './icon-fa.component.html',
  styleUrls: ['./icon-fa.component.css']
})
export class IconFaComponent {

  @Input() public nameIcon: string = "gear";
  @Input() public sizeIcon: "small" | "medium" | "large" = "small";

}
