import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesAuthRoutingModule} from './pages-auth-routing.module';
import {PagesAuthComponent} from './pages-auth.component';

@NgModule({
  declarations: [
    PagesAuthComponent
  ],
  imports: [
    CommonModule,
    PagesAuthRoutingModule,
  ],
  providers: []
})
export class PagesAuthModule {
}
