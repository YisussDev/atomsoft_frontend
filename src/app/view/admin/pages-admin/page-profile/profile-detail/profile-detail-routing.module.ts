import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileDetailComponent} from "@view/admin/pages-admin/page-profile/profile-detail/profile-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDetailRoutingModule { }
