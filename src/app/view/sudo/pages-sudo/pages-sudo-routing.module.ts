import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesSudoComponent} from "@view/sudo/pages-sudo/pages-sudo.component";

const routes: Routes = [
  {
    path: '',
    component: PagesSudoComponent,
    children: [
      {
        path: "home",
        loadChildren: () => import("./sudo-home/sudo-home.module").then(m => m.SudoHomeModule)
      },
      {
        path: "account",
        loadChildren: () => import("./sudo-accounts/sudo-accounts.module").then(m => m.SudoAccountsModule)
      },
      {
        path: "application",
        loadChildren: () => import("./sudo-applications/sudo-applications.module").then(m => m.SudoApplicationsModule)
      },
      {
        path: "**", redirectTo: "home"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesSudoRoutingModule {
}
