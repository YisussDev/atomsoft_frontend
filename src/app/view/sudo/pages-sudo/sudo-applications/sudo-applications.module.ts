import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SudoApplicationsRoutingModule} from './sudo-applications-routing.module';
import {SudoApplicationsComponent} from './sudo-applications.component';
import {SudoApplicationCreateComponent} from './sudo-application-create/sudo-application-create.component';
import {SudoApplicationListComponent} from './sudo-application-list/sudo-application-list.component';
import {SudoApplicationDetailComponent} from './sudo-application-detail/sudo-application-detail.component';
import {SudoApplicationFormComponent} from './sudo-application-form/sudo-application-form.component';
import {SudoApplicationUpdateComponent} from './sudo-application-update/sudo-application-update.component';
import {ApplicationCompositionModule} from "../../../../composition/application/application.composition.module";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {ColumnTemplateDirective} from "@core/directives/column-template/column-template.directive";
import {DropdownItemDirective} from "@core/directives/dropdown/dropdown-item.directive";
import {IconsModule} from "@ui/icons/icons.module";
import {TablesModule} from "@ui/tables/tables.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Inputsv2Module} from "@ui/inputsv2/inputsv2.module";
import {TypographyModule} from "@core/directives/typography/typography.module";
import {DocumentViewerModule} from "@ui/document-viewer/document-viewer.module";


@NgModule({
  declarations: [
    SudoApplicationsComponent,
    SudoApplicationCreateComponent,
    SudoApplicationListComponent,
    SudoApplicationDetailComponent,
    SudoApplicationFormComponent,
    SudoApplicationUpdateComponent
  ],
  imports: [
    CommonModule,
    SudoApplicationsRoutingModule,
    ApplicationCompositionModule,
    ButtonsModule,
    ColumnTemplateDirective,
    DropdownItemDirective,
    IconsModule,
    TablesModule,
    FormsModule,
    Inputsv2Module,
    ReactiveFormsModule,
    TypographyModule,
    DocumentViewerModule
  ]
})
export class SudoApplicationsModule {
}
