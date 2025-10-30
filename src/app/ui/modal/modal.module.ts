import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalGenericComponent} from "@ui/modal/components/modal-generic/modal-generic.component";
import {ModalSimpleComponent} from "@ui/modal/components/modal-simple/modal-simple.component";


@NgModule({
  declarations: [
    ModalGenericComponent,
    ModalSimpleComponent
  ],
  exports: [
    ModalSimpleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class ModalModule {
}
