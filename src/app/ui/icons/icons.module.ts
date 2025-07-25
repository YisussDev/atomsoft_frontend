import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMaterialComponent } from './icon-material/icon-material.component';
import { IconFaComponent } from './icon-fa/icon-fa.component';



@NgModule({
  declarations: [
    IconMaterialComponent,
    IconFaComponent
  ],
  exports: [
    IconMaterialComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule { }
