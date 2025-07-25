import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsideComponent} from './components/aside/aside.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {InputsModule} from "../inputs/inputs.module";
import {ButtonAsideComponent} from './components/button-aside/button-aside.component';
import {ModalModule} from "../modal/modal.module";


@NgModule({
  declarations: [
    AsideComponent,
    ButtonAsideComponent,
  ],
  exports: [
    AsideComponent,
    ButtonAsideComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule,
    ModalModule
  ]
})
export class AsideModule {
}
