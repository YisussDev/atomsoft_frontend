import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconsModule} from "@ui/icons/icons.module";
import { InputNumberComponent } from './components/input-number/input-number.component';
import {CurrencyMaskDirective} from "@core/directives/currency-mask/currency-mask.directive";
import { InputChipsComponent } from './components/input-chips/input-chips.component';
import { InputToggleComponent } from './components/input-toggle/input-toggle.component';
import {TypographyModule} from "@core/directives/typography/typography.module";



@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputChipsComponent,
    InputToggleComponent
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputChipsComponent,
    InputToggleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule,
    CurrencyMaskDirective,
    FormsModule,
    TypographyModule
  ]
})
export class Inputsv2Module { }
