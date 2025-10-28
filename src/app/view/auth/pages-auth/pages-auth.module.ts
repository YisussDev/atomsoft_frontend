import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesAuthRoutingModule} from './pages-auth-routing.module';
import {PagesAuthComponent} from './pages-auth.component';
import {AuthCompositionModule} from "../../../composition/auth/auth.composition.module";

@NgModule({
  declarations: [
    PagesAuthComponent
  ],
  imports: [
    CommonModule,
    PagesAuthRoutingModule,
    AuthCompositionModule
  ],
  providers: []
})
export class PagesAuthModule {
}
