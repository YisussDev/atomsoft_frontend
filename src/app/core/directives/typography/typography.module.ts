import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDirective } from './typography.directive';



@NgModule({
  declarations: [
    TypographyDirective
  ],
  exports: [
    TypographyDirective
  ],
  imports: [
    CommonModule
  ]
})
export class TypographyModule { }
