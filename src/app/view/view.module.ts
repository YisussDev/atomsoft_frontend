import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewRoutingModule} from "@view/view-routing.module";
import {InputsModule} from "@ui/inputs/inputs.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ViewComponent} from "@view/view.component";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {ModalModule} from "@ui/modal/modal.module";
import {ApplicationCompositionModule} from "../composition/application/application.composition.module";
import {AuthCompositionModule} from "../composition/auth/auth.composition.module";


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    InputsModule,
    ReactiveFormsModule,
    ButtonsModule,
    ModalModule,
    AuthCompositionModule,
    ApplicationCompositionModule
  ]
})
export class ViewModule {
}
