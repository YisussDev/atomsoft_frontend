import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableGenericComponent} from './table-generic/table-generic.component';
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {NgxTippyModule} from "ngx-tippy-wrapper";
import {TypographyModule} from "@core/directives/typography/typography.module";
import {IconsModule} from "@ui/icons/icons.module";


@NgModule({
  declarations: [
    TableGenericComponent,
  ],
  exports: [
    TableGenericComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule,
    NgxTippyModule,
    TypographyModule,
    IconsModule,
  ]
})
export class TablesModule {
}
