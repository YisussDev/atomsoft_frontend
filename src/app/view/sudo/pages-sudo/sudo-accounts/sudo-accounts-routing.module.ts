import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  SudoAccountsListComponent
} from "@view/sudo/pages-sudo/sudo-accounts/sudo-accounts-list/sudo-accounts-list.component";
import {
  SudoAccountsDetailComponent
} from "@view/sudo/pages-sudo/sudo-accounts/sudo-accounts-detail/sudo-accounts-detail.component";
import {
  SudoAccountsCreateComponent
} from "@view/sudo/pages-sudo/sudo-accounts/sudo-accounts-create/sudo-accounts-create.component";
import {
  SudoAccountsUpdateComponent
} from "@view/sudo/pages-sudo/sudo-accounts/sudo-accounts-update/sudo-accounts-update.component";

const routes: Routes = [
  {
    path: "list",
    component: SudoAccountsListComponent
  },
  {
    path: "detail/:accountId",
    component: SudoAccountsDetailComponent
  },
  {
    path: "create",
    component: SudoAccountsCreateComponent
  },
  {
    path: "update/:accountId",
    component: SudoAccountsUpdateComponent
  },
  {
    path: "**", redirectTo: "list"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudoAccountsRoutingModule {
}
