import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal-simple.component.html',
  styleUrls: ['./modal-simple.component.css']
})
export class ModalSimpleComponent {
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
