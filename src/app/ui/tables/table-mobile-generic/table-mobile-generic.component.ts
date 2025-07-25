import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {TableModel} from "@core-models/tables/table.models";
import {TableConfigInterface} from "@core-interfaces/tables/table-config.interface";
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {ActionEvent} from "@core-interfaces/actions/action.interface";
import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AsideService} from "../../aside/services/aside.service";
import {ModalEditColumnsComponent} from "../table-generic/utils/modal-edit-columns/modal-edit-columns.component";
import {ExportDataTableComponent} from "../components/export-data-table/export-data-table.component";
import {ConfigPrincipleRowInterface} from "./interfaces/configPrincipleRow.interface";

@Component({
  selector: 'app-table-mobile-generic',
  templateUrl: './table-mobile-generic.component.html',
  styleUrls: ['./table-mobile-generic.component.css']
})
export class TableMobileGenericComponent extends TableModel implements OnInit, OnChanges, OnDestroy {

  @Input() title: string = '';

  @Input() configTable: TableConfigInterface[] = [];
  @Input() defaultTableData: any[] = [];
  @Input() pagination!: PaginationInterface;
  @Input() perPage!: number;
  @Input() tableConfigFieldActions: ActionEvent[] = [];
  @Input() validActions!: boolean;
  @Input() configPrinciplesRow!: ConfigPrincipleRowInterface;
  @Input() showHeaderTable: boolean = false;

  @Input() public tableColumnConfig: TableColumnConfigInterface[] = [];
  @Input() public tableQuicklyActionsConfig: ActionEvent[] = [];
  @Input() public tableHeaderActionsConfig: ActionEvent[] = [];
  @Input() public tableData: any[] = [];
  @Input() public tableActions: ActionEvent[] = [];
  @Input() public tablePagination!: PaginationInterface;

  @Input() public headerActions: boolean = false;
  @Input() public multipleActions: boolean = false;
  @Input() public searchActions: boolean = true;
  @Input() public quicklyActions: boolean = false;
  @Input() public exportAction: boolean = false;
  @Input() public columnConfigAction: boolean = false;

  @Input() public tableLimit: number = 10;
  @Input() public tableLimitList: number[] = [10, 20];
  @Input() isResponsive: boolean = false;
  @Input() principalActions: ActionEvent[] = [];

  @Output() public tableEvents: EventEmitter<{ data: any; event: string | null }> = new EventEmitter<{
    data: any;
    event: string | null
  }>();
  @Output() public eventLimitChange: EventEmitter<number> = new EventEmitter<number>;

  @Input() public multipleStyle: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private asideService: AsideService,
  ) {
    super(formBuilder, router);
  }

  ngOnInit() {
    this.initFormQueries();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public eventRow(data: { data: any; event: string | null }): void {
    this.tableEvents.emit(data);
  }

  public changeTableLimit(limit: number): void {
    this.eventLimitChange.emit(limit);
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
      undefined,
      undefined,
      {
        position: 'bottom',
        size: 'fit'
      }
    );
  }

  ngOnDestroy() {
    if (this.listenTableFormQueries$) this.listenTableFormQueries$.unsubscribe();
  }

}
