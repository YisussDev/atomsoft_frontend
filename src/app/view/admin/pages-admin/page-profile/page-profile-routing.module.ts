import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageProfileComponent} from "@view/admin/pages-admin/page-profile/page-profile.component";

const routes: Routes = [
  {
    path: '',
    component: PageProfileComponent,
    children: [
      {
        path: 'detail',
        loadChildren: () => import("./profile-detail/profile-detail.module").then((m) => m.ProfileDetailModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import("./profile-configuration/profile-configuration.module").then((m) => m.ProfileConfigurationModule),
      }
    ]
  },
  {
    path: '**', redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageProfileRoutingModule {
}
