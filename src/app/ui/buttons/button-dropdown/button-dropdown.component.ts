import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ActionEvent} from "@core/interfaces/actions/action.interface";

@Component({
  selector: 'app-button-dropdown',
  templateUrl: './button-dropdown.component.html',
  styleUrls: ['./button-dropdown.component.css']
})
export class ButtonDropdownComponent implements OnInit, AfterViewInit {

  public open: boolean = false;
  public overflowValue: number = 0;
  public widthContainer: number = 0;

  @Input() public label: string = '';
  @Input() public actions: ActionEvent[] = [];
  @Input() public data: any;

  @Output() public eventClick: EventEmitter<{ event: string, data: any }> = new EventEmitter<{
    event: string,
    data: any
  }>();

  @ViewChild('container') public container!: ElementRef;

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.calculateWidthContainer();
  }

  private calculateWidthContainer(): void {
    this.widthContainer = this.container.nativeElement.getBoundingClientRect().width;
    this._cdr.detectChanges();
  }

  public clickOptionAction(action: string, data: any): void {
    this.open = false;
    this.eventClick.emit({event: action, data: data})
  }

  public overflowDetect(value: number): void {
    this.overflowValue = value;
  }

  public getOverflowStyle() {
    return {right: `-${this.overflowValue}px`};
  }

  public clickOutside(): void {
    this.open = false;
  }

}
