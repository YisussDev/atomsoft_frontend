import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-bar-load',
  templateUrl: './bar-load.component.html',
  styleUrls: ['./bar-load.component.css']
})
export class BarLoadComponent implements OnInit, OnChanges {

  @Input() public maxBar: number = 0;
  @Input() public valuesBar: { label: string; value: number; colorBar: string }[] = [];
  @Input() public height: number = 20;
  @Input() public showPercentage: boolean = true;


  ngOnInit() {
    this.calculateTotalBar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes['valuesBar'] && changes['valuesBar'].currentValue) {
        this.calculateTotalBar();
      }
    }
  }

  public calculateWidth(valueToCalculate: number): number {
    return (valueToCalculate / this.maxBar) * 100;
  }

  public calculateTotalBar(): void {
    let total: number = 0;
    for (let valueBar of this.valuesBar) {
      total = total + valueBar.value
    }
    this.maxBar = total;
  }

}
