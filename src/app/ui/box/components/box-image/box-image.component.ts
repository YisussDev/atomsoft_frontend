import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-box-image',
  templateUrl: './box-image.component.html',
  styleUrls: ['./box-image.component.css']
})
export class BoxImageComponent {

  @Input() className = ""

  get boxClasses(): string {

    let classes = "";

    if (this.className) {
      classes += ` ${this.className}`
    }

    return classes
  }

}
