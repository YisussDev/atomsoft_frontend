import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalGenericComponent} from "@ui/modal/components/modal-generic/modal-generic.component";


@NgModule({
  declarations: [
    ModalGenericComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class ModalModule {
}
