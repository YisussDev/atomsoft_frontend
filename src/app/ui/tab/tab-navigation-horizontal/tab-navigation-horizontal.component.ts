import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tab-navigation-horizontal',
  templateUrl: './tab-navigation-horizontal.component.html',
  styleUrls: ['./tab-navigation-horizontal.component.css']
})
export class TabNavigationHorizontalComponent {

  @Input() public tabConfig: { label: string; resource: string; typeResource: 'icon' | 'img'; path: string }[] = []

}
