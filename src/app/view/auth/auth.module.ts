import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {InputsModule} from "../../ui/inputs/inputs.module";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputsModule
  ],
  providers: [
  ]
})
export class AuthModule {
}
