import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecoverComponent} from "@view/auth/pages-auth/recover/recover.component";

const routes: Routes = [
  {
    path: '',
    component: RecoverComponent,
  },
  {
    path: "**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverRoutingModule {
}
