import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewRoutingModule} from "@view/view-routing.module";
import {InputsModule} from "@ui/inputs/inputs.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ViewComponent} from "@view/view.component";
import {ButtonsModule} from "@ui/buttons/buttons.module";
import {ModalModule} from "@ui/modal/modal.module";
import {AuthGuardModule} from "@application/guards/auth/auth.guard.module";


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
    AuthGuardModule
  ]
})
export class ViewModule {
}
