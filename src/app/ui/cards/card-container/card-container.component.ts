import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {

  @Input() public title!: string;
  @Input() public subTitle!: string;
  @Input() public icon!: string;
  @Input() public className: string = "";

}
