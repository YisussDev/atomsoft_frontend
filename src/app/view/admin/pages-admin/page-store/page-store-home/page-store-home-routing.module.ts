import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageStoreHomeComponent} from "@view/admin/pages-admin/page-store/page-store-home/page-store-home.component";

const routes: Routes = [
  {
    path: '',
    component: PageStoreHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStoreHomeRoutingModule { }
