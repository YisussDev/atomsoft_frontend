import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesSudoRoutingModule} from './pages-sudo-routing.module';
import {PagesSudoComponent} from './pages-sudo.component';
import {SudoUiModule} from "@view/sudo/sudo-ui/sudo-ui.module";


@NgModule({
  declarations: [
    PagesSudoComponent
  ],
  imports: [
    CommonModule,
    PagesSudoRoutingModule,
    SudoUiModule
  ]
})
export class PagesSudoModule {
}
