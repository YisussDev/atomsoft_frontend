import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IconsModule} from "@ui/icons/icons.module";
import { InputNumberComponent } from './components/input-number/input-number.component';
import {CurrencyMaskDirective} from "@core/directives/currency-mask/currency-mask.directive";



@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IconsModule,
        CurrencyMaskDirective
    ]
})
export class Inputsv2Module { }
