import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SudoHomeComponent} from "@view/sudo/pages-sudo/sudo-home/sudo-home.component";

const routes: Routes = [
  {
    path: "",
    component: SudoHomeComponent
  },
  {
    path: "**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudoHomeRoutingModule {
}
