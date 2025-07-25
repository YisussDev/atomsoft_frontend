import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {ErrorInputService} from "./services/error-input.service";
import {InputFileComponent} from './components/input-file/input-file.component';
import {InputTextComponent} from "./components/input-text/input-text.component";
import {InputNumberComponent} from "./components/input-number/input-number.component";
import {InputPasswordComponent} from "./components/input-password/input-password.component";
import {InputSelectComponent} from "./components/input-select/input-select.component";
import {InputDateComponent} from "./components/input-date/input-date.component";
import {InputAutocompleteComponent} from "./components/input-autocomplete/input-autocomplete.component";
import {InputCheckboxComponent} from "./components/input-checkbox/input-checkbox.component";
import {InputTextareaComponent} from './components/input-textarea/input-textarea.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputSelectComponent,
    InputDateComponent,
    InputAutocompleteComponent,
    InputCheckboxComponent,
    InputFileComponent,
    InputTextareaComponent
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputSelectComponent,
    InputDateComponent,
    InputAutocompleteComponent,
    InputCheckboxComponent,
    InputFileComponent,
    InputTextareaComponent
  ],
  providers: [
    ErrorInputService
  ]
})
export class InputsModule {
}
