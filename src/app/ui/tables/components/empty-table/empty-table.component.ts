import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-table',
  templateUrl: './empty-table.component.html',
  styleUrls: ['./empty-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyTableComponent {

  @Input() public tableLimit: number = 10;

}
