import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule} from "../buttons/buttons.module";
import {TableGenericComponent} from './table-generic/table-generic.component';
import {InputsModule} from "../inputs/inputs.module";
import {EmptyTableComponent} from './components/empty-table/empty-table.component';
import {ModalEditColumnsComponent} from './table-generic/utils/modal-edit-columns/modal-edit-columns.component';
import {TableMobileGenericComponent} from './table-mobile-generic/table-mobile-generic.component';
import {
  ItemTableGenericComponent
} from './table-mobile-generic/components/item-table-generic/item-table-generic.component';
import {ExportDataTableComponent} from './components/export-data-table/export-data-table.component';
import {ClickOutsideModule} from "../../core/directives/click-outside/click-outside.module";
import {TranslatePipe} from "@ngx-translate/core";
import {TableContainerComponent} from "./table-container/table-container.component";
import {IconsModule} from "../icons/icons.module";
import {SwitchModule} from "../switch/switch.module";
import {CardsModule} from "../cards/cards.module";
import {NgxTippyModule} from "ngx-tippy-wrapper";


@NgModule({
  declarations: [
    TableComponent,
    PaginationComponent,
    TableGenericComponent,
    EmptyTableComponent,
    ModalEditColumnsComponent,
    TableMobileGenericComponent,
    ItemTableGenericComponent,
    ExportDataTableComponent,
    TableContainerComponent
  ],
  exports: [
    TableComponent,
    PaginationComponent,
    TableGenericComponent,
    EmptyTableComponent,
    TableMobileGenericComponent,
    TableContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    ClickOutsideModule,
    TranslatePipe,
    IconsModule,
    SwitchModule,
    CardsModule,
    NgxTippyModule,
  ]
})
export class TablesModule {
}
