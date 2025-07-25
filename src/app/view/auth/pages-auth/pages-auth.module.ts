import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesAuthRoutingModule} from './pages-auth-routing.module';
import {PagesAuthComponent} from './pages-auth.component';
import {AccountUseCaseModule} from "@application/use-cases/account/account.use-case.module";

@NgModule({
  declarations: [
    PagesAuthComponent
  ],
  imports: [
    CommonModule,
    PagesAuthRoutingModule,
    AccountUseCaseModule
  ],
  providers: []
})
export class PagesAuthModule {
}
