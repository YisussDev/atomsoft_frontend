import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProfileConfigurationComponent
} from "@view/admin/pages-admin/page-profile/profile-configuration/profile-configuration.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileConfigurationComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileConfigurationRoutingModule {
}
