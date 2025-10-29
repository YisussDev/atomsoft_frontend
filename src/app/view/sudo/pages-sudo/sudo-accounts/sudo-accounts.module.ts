import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SudoAccountsRoutingModule} from './sudo-accounts-routing.module';
import {SudoAccountsComponent} from './sudo-accounts.component';
import {SudoAccountsFormComponent} from './sudo-accounts-form/sudo-accounts-form.component';
import {SudoAccountsCreateComponent} from './sudo-accounts-create/sudo-accounts-create.component';
import {SudoAccountsUpdateComponent} from './sudo-accounts-update/sudo-accounts-update.component';
import {
  SudoAccountsListComponent
} from "@view/sudo/pages-sudo/sudo-accounts/sudo-accounts-list/sudo-accounts-list.component";
import {AccountCompositionModule} from "../../../../composition/account/account.composition.module";
import {TablesModule} from "@ui/tables/tables.module";
import {ColumnTemplateDirective} from "@core/directives/column-template/column-template.directive";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {DropdownItemDirective} from "@core/directives/dropdown/dropdown-item.directive";
import {IconsModule} from "@ui/icons/icons.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Inputsv2Module} from "@ui/inputsv2/inputsv2.module";


@NgModule({
  declarations: [
    SudoAccountsComponent,
    SudoAccountsFormComponent,
    SudoAccountsCreateComponent,
    SudoAccountsUpdateComponent,
    SudoAccountsListComponent
  ],
  imports: [
    CommonModule,
    SudoAccountsRoutingModule,
    AccountCompositionModule,
    TablesModule,
    ColumnTemplateDirective,
    ButtonsModule,
    DropdownItemDirective,
    IconsModule,
    ReactiveFormsModule,
    Inputsv2Module,
  ]
})
export class SudoAccountsModule {
}
