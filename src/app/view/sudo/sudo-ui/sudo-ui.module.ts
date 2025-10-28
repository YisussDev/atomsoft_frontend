import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudoHeaderComponent } from './components/sudo-header/sudo-header.component';
import {ClickOutsideModule} from "@core/directives/click-outside/click-outside.module";
import {IconsModule} from "@ui/icons/icons.module";
import {RouterLink} from "@angular/router";
import { SudoNavbarComponent } from './components/sudo-navbar/sudo-navbar.component';
import {TypographyModule} from "@core/directives/typography/typography.module";



@NgModule({
  declarations: [
    SudoHeaderComponent,
    SudoNavbarComponent
  ],
  exports: [
    SudoHeaderComponent,
    SudoNavbarComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    IconsModule,
    RouterLink,
    TypographyModule
  ]
})
export class SudoUiModule { }
