import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IconsModule} from "@ui/icons/icons.module";



@NgModule({
  declarations: [
    InputTextComponent
  ],
  exports: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class Inputsv2Module { }
