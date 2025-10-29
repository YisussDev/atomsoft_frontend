import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  SudoApplicationCreateComponent
} from "@view/sudo/pages-sudo/sudo-applications/sudo-application-create/sudo-application-create.component";
import {
  SudoApplicationListComponent
} from "@view/sudo/pages-sudo/sudo-applications/sudo-application-list/sudo-application-list.component";
import {
  SudoApplicationDetailComponent
} from "@view/sudo/pages-sudo/sudo-applications/sudo-application-detail/sudo-application-detail.component";
import {
  SudoApplicationUpdateComponent
} from "@view/sudo/pages-sudo/sudo-applications/sudo-application-update/sudo-application-update.component";

const routes: Routes = [
  {
    path: "list",
    component: SudoApplicationListComponent
  },
  {
    path: "create",
    component: SudoApplicationCreateComponent
  },
  {
    path: "detail:applicationId",
    component: SudoApplicationDetailComponent
  },
  {
    path: "update/:applicationId",
    component: SudoApplicationUpdateComponent
  },
  {
    path: "**", redirectTo: "list"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudoApplicationsRoutingModule {
}
