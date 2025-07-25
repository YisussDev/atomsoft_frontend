import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SwitchOptionInterface} from "../../switch/interfaces/switch-option.interface";
import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";
import {ActionEvent} from "@core-interfaces/actions/action.interface";
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {AsideService} from "../../aside/services/aside.service";
import {ModalEditColumnsComponent} from "../table-generic/utils/modal-edit-columns/modal-edit-columns.component";
import {generateQuerySearchUrl} from "@core-helpers/table/helper-table";
import {ConfigPrincipleRowInterface} from "../table-mobile-generic/interfaces/configPrincipleRow.interface";

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent implements OnInit, OnDestroy {

  public tableFormQueries!: FormGroup;

  public switchOptionsTable: SwitchOptionInterface[] = [
    {label: 'Tabla', value: 'table', icon: 'table-cells'},
    {label: 'Tarjetas ', value: 'cards', icon: 'table-cells-large'}
  ];
  public switchOptionActive: 'table' | 'cards' | string = 'table';

  @Input() public tableName: string = 'default';
  @Input() public tablePrincipalTitle: string = "Title Default";
  @Input() public tablePrincipalDescription: string = "Description Default";
  @Input() public tablePrincipalIcon: string = "settings";
  @Input() public tableColumnConfig: TableColumnConfigInterface[] = [];
  @Input() public tableFieldActionsConfig: ActionEvent[] = [];
  @Input() public configPrinciplesRow!: ConfigPrincipleRowInterface;
  @Input() public tableQuicklyActionsConfig: ActionEvent[] = [];
  @Input() public tableHeaderActionsConfig: ActionEvent[] = [];
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
  @Input() public isResponsive: boolean = false;

  @Output() public tableEvents: EventEmitter<{ data: any; event: string | null }> = new EventEmitter<{
    data: any;
    event: string | null;
  }>;
  @Output() public eventLimitChange: EventEmitter<number> = new EventEmitter<number>;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private asideService: AsideService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initTableFormQueries();
  }

  public eventRow(data: any, nameEvent: string | null): void {
    this.tableEvents.emit({data, event: nameEvent});
  }

  public changeTableLimit(limit: number): void {
    this.eventLimitChange.emit(limit);
  }

  public changeTypeView(type: 'table' | 'cards' | string): void {
    this.switchOptionActive = type;
  }

  public eventChangeLimit(limit: number): void {
    this.tableLimit = limit;
  }

  public listenEventFields(data: { data: any, event: string | null }): void {
    this.tableEvents.emit(data);
  }

  private initTableFormQueries(): void {
    this.tableFormQueries = this._formBuilder.group({});
    this.tableFormQueries.addControl('search', this._formBuilder.control(''));
    for (let config of this.tableColumnConfig) {
      if (config.column_search && !config.column_name.includes('.')) this.tableFormQueries.addControl(config.column_name, this._formBuilder.control(null));
      if (config.column_search && config.column_name.includes('.')) {
        const indPoint: number | -1 = config.column_name.indexOf('.');
        this.tableFormQueries.addControl(`${config.column_name.slice(0, indPoint)}_id`, this._formBuilder.control(null));
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

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }


}

