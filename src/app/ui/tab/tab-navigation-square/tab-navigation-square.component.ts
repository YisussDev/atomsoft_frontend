import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tab-navigation-square',
  templateUrl: './tab-navigation-square.component.html',
  styleUrls: ['./tab-navigation-square.component.css']
})
export class TabNavigationSquareComponent {

  @Input() public tabConfig: { label: string; resource: string; typeResource: 'icon' | 'img'; path: string }[] = [];

}
