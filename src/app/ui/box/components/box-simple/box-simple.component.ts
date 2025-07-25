import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-box-simple',
  templateUrl: './box-simple.component.html',
  styleUrls: ['./box-simple.component.css']
})
export class BoxSimpleComponent {


  @Input() className = ""

  get boxClasses(): string {

    let classes = "w-fit shadow-xl border-0 bg-btw-secondary backdrop-blur-sm rounded-lg";

    if (this.className) {
      classes += ` ${this.className}`
    }

    return classes
  }

}
