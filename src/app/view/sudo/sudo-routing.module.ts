import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SudoComponent} from "@view/sudo/sudo.component";

const routes: Routes = [
  {
    path: '',
    component: SudoComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./pages-sudo/pages-sudo.module").then(m => m.PagesSudoModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudoRoutingModule {
}
