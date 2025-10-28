import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Input() title: string = 'default_title_aside';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public closeModal() {
    this.close.emit();
  }
}
