import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionEvent} from "@core-interfaces/actions/action.interface";
import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";
import {ConfigPrincipleRowInterface} from "../../interfaces/configPrincipleRow.interface";

@Component({
  selector: 'app-item-table-generic',
  templateUrl: './item-table-generic.component.html',
  styleUrls: ['./item-table-generic.component.css']
})
export class ItemTableGenericComponent implements OnInit, AfterViewInit {

  public isExpanded: boolean = false;
  public heightCalculated: number = 0;

  @Input() public dataRow!: any;
  @Input() public tableColumnConfig: TableColumnConfigInterface[] = [];
  @Input() public tableConfigFieldActions: ActionEvent[] = [];
  @Input() public configPrinciplesRow!: ConfigPrincipleRowInterface;
  @Input() public showHeaderTable!: boolean;
  @Input() public validActions: boolean = false;
  @Input() public columnPerRow: 1 | 2 | 3 = 2;
  @Output() public tableEvents: EventEmitter<{ data: any; event: string | null }> = new EventEmitter<{
    data: any;
    event: string | null
  }>();

  ngOnInit() {
    this.calculatedHeightWithColumnActives();
  }

  ngAfterViewInit() {
  }

  public expandItem(): void {
    this.isExpanded = !this.isExpanded;
  }

  public clickOutside(): void {
    this.isExpanded = false;
  }

  public eventRow(event: string | null, $event: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.tableEvents.emit({data: this.dataRow, event});
  }

  public eventOptions(event: { event: string, data: any }): void {
    this.tableEvents.emit({data: this.dataRow, event: event.event});
  }

  public getDataColumn(column_name: string): string {
    const columnName = column_name;

    // Si no hay punto, se retorna directamente
    if (!columnName.includes('.')) {
      return this.dataRow[columnName];
    }

    // Si hay punto, se accede de forma anidada
    const [firstKey, secondKey] = columnName.split('.');
    return this.dataRow?.[firstKey]?.[secondKey] ?? 'N/A';
  }

  private calculateColumnActives(): number {
    let totalColumnActive: number = 0;
    this.tableColumnConfig.forEach(column => {
      if (column.visible) totalColumnActive++
    })
    return totalColumnActive;
  }

  private calculatedHeightWithColumnActives(): void {
    const columnsActives: number = this.calculateColumnActives();
    let totalRowsCalculated: number = 0;
    if (columnsActives % this.columnPerRow == 0) {
      totalRowsCalculated = columnsActives / this.columnPerRow;
    } else {
      totalRowsCalculated = Math.trunc(columnsActives / this.columnPerRow) + 1;
    }
    this.heightCalculated = totalRowsCalculated * 50;
  }

}
