import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ActionEvent} from "@core-interfaces/actions/action.interface";
import {ModalEditColumnsComponent} from "./utils/modal-edit-columns/modal-edit-columns.component";
import {AsideService} from "../../aside/services/aside.service";
import {ExportDataTableComponent} from "../components/export-data-table/export-data-table.component";
import {generateQuerySearchUrl} from "@core-helpers/table/helper-table";
import {SwitchOptionInterface} from "../../switch/interfaces/switch-option.interface";
import {OrderDataService} from "@core-services/utils/order-data.service";

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.css'],
  providers: [
    OrderDataService
  ]
})
export class TableGenericComponent implements OnInit, OnChanges, OnDestroy {

  public tableFormQueries!: FormGroup;
  public orderDataOriginal: any[] = [];
  @Input() public switchOptionsTable: SwitchOptionInterface[] = [
    {label: 'Tabla', value: 'table', icon: 'table-cells'},
    {label: 'Tarjetas ', value: 'cards', icon: 'table-cells-large'}
  ];
  @Input() public switchOptionActive: 'table' | 'cards' | string = 'table';

  @Input() public tableName!: string;
  @Input() public tablePrincipalTitle: string = "Title Default";
  @Input() public tablePrincipalDescription: string = "Description Default";
  @Input() public tablePrincipalIcon: string = "settings";
  @Input() public tableColumnConfig: TableColumnConfigInterface[] = [];
  @Input() public tableQuicklyActionsConfig: ActionEvent[] = [];
  @Input() public tableHeaderActionsConfig: ActionEvent[] = [];
  @Input() public tableFieldActionsConfig: ActionEvent[] = [];
  @Input() public tableData: any[] = [];
  @Input() public tableActions: ActionEvent[] = [];
  @Input() public tablePagination!: PaginationInterface;
  @Input() public tableHeaderIdentifier: string = 'colum_name';
  @Input() public tableBodyIdentifier: string = 'id';
  @Input() public tableLimit: number = 10;
  @Input() public tableLimitList: number[] = [10, 20];
  @Input() public headerActions: boolean = false;
  @Input() public multipleActions: boolean = false;
  @Input() public searchActions: boolean = false;
  @Input() public quicklyActions: boolean = false;
  @Input() public exportAction: boolean = false;
  @Input() public filterAction: boolean = false;

  @Output() public tableEvents: EventEmitter<{ data: any; event: string }> = new EventEmitter<{
    data: any;
    event: string;
  }>;
  @Output() public eventLimitChange: EventEmitter<number> = new EventEmitter<number>;
  @Output() public eventViewChange: EventEmitter<'table' | 'cards' | string> = new EventEmitter<'table' | 'cards' | string>;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private orderService: OrderDataService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private asideService: AsideService,
  ) {
  }

  ngOnInit() {
    this.initTableFormQueries();
    this.verifyLocalConfig();
    this.initListenExportData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes['tableData'] && changes['tableData'].currentValue) {
        this.orderDataOriginal = JSON.parse(JSON.stringify(this.tableData));
      }
    }
  }

  public trackByFnHeader(index: number, item: any): string {
    return item[this.tableHeaderIdentifier];
  }

  public trackByFnBody(index: number, item: any): string {
    return item[this.tableBodyIdentifier];
  }

  public configColumn(columnConfig: TableColumnConfigInterface): boolean {
    return columnConfig.visible;
  }

  public getDataRow(dataRow: any, config: TableColumnConfigInterface): string {
    const columnName = config.column_name;

    // Si no hay punto, se retorna directamente
    if (!columnName.includes('.')) {
      return dataRow[columnName];
    }

    // Si hay punto, se accede de forma anidada
    const [firstKey, secondKey] = columnName.split('.');
    return dataRow?.[firstKey]?.[secondKey] ?? 'N/A';
  }

  public eventRow(data: any, nameEvent: string): void {
    this.tableEvents.emit({data, event: nameEvent});
  }

  public convertColumName(columnName: string): string {
    const indPoint: number | -1 = columnName.indexOf('.');
    return `${columnName.slice(0, indPoint)}_id`
  }

  public changeTableLimit(limit: number): void {
    this.eventLimitChange.emit(limit);
  }

  private initTableFormQueries(): void {
    this.tableFormQueries = this._formBuilder.group({});
    this.tableFormQueries.addControl('search', this._formBuilder.control(''));
    for (let config of this.tableColumnConfig) {
      if(config.column_search){
        this.tableFormQueries.addControl(config.column_name, this._formBuilder.control(null));
      }
    }
    this.tableFormQueries.valueChanges.pipe(
      takeUntil(this._subscriber),
      debounceTime(500)
    ).subscribe({
      next: (formData) => {
        const queryGenerated = generateQuerySearchUrl(formData);
        const path: string = window.location.pathname;
        this._router.navigateByUrl(`${path}?page=1${queryGenerated}`)
      }
    })
  }

  public openModalEditColumns(): void {
    this.asideService.openAsideComponent(
      ModalEditColumnsComponent,
      'Configurar Columnas',
      'CONFIG_COLUMNS',
      undefined,
      undefined,
      this.tableColumnConfig,
      this.tableName
    );
  }

  public openModalExportData(): void {
    this.asideService.openAsideComponent(
      ExportDataTableComponent,
      'Exportar Datos',
      'EXPORT_DATA',
      undefined,
      undefined,
      this.tableColumnConfig,
      undefined,
      {
        position: 'right',
        size: 'fit'
      }
    );
  }

  private initListenExportData(): void {
    this.asideService.closeAside.pipe(
      takeUntil(this._subscriber),
    ).subscribe(event => {
      if (event) {
        switch (event.eventName) {
          case 'EXPORT_DATA':
            this.eventRow(event.data, 'EXPORT_DATA');
            break;
        }
      }
    })
  }

  private verifyLocalConfig(): void {
    // if (this.tableName) {
    //   const configLocal: string | null = localStorage.getItem(this.tableName);
    //   if (configLocal) {
    //     this.tableColumnConfig = JSON.parse(configLocal);
    //   }
    // }
  }

  public changeOrderColum(config: TableColumnConfigInterface): void {
    switch (config.column_order) {
      case 'none':
        this.changeAllOrderColumn(config);
        this.applyOrderAscData(config);
        break;
      case 'asc':
        this.changeAllOrderColumn(config);
        this.applyOrderDescData(config);
        break;
      case 'desc':
        this.changeAllOrderColumn(null);
        this.applyOrderDataOriginal();
        break;
    }
  }

  private changeAllOrderColumn(config: TableColumnConfigInterface | null): void {
    const copyConfig: TableColumnConfigInterface[] = JSON.parse(JSON.stringify(this.tableColumnConfig));
    for (let configColum of copyConfig) {
      if (config) {
        if (configColum.column_name == config.column_name) {
          if (config.column_order == 'none') {
            configColum.column_order = 'asc';
          } else if (config.column_order == 'asc') {
            configColum.column_order = 'desc';
          } else if (config.column_order == 'desc') {
            configColum.column_order = 'none';
          }
        } else {
          configColum.column_order = 'none';
        }
      } else {
        configColum.column_order = 'none';
      }
    }
    this.tableColumnConfig = JSON.parse(JSON.stringify(copyConfig));
  }

  private applyOrderAscData(config: TableColumnConfigInterface): void {
    this.applyOrderDataOriginal();
    this.tableData = this.orderService.orderAscData(this.tableData, config.column_name);
  }

  private applyOrderDescData(config: TableColumnConfigInterface): void {
    this.applyOrderDataOriginal();
    this.tableData = this.orderService.orderDesData(this.tableData, config.column_name);
  }

  private applyOrderDataOriginal(): void {
    this.tableData = JSON.parse(JSON.stringify(this.orderDataOriginal));
  }

  public changeTypeView(type: 'table' | 'cards' | string): void {
    this.switchOptionActive = type;
    this.eventViewChange.emit(type);
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
