import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon-material',
  templateUrl: './icon-material.component.html',
  styleUrls: ['./icon-material.component.css']
})
export class IconMaterialComponent {

  @Input() public nameIcon: string = "gear";
  @Input() public sizeIcon: "small" | "medium" | "large" | "extra_large" | "xxl" | "maximum" = "small";

}
