import {Component} from '@angular/core';

@Component({
  selector: 'app-view',
  template: `
    <router-outlet></router-outlet>
  `
})
export class ViewComponent {

  constructor() {
  }

}
