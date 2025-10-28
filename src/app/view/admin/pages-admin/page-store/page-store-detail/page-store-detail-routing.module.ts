import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PageStoreDetailComponent
} from "@view/admin/pages-admin/page-store/page-store-detail/page-store-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PageStoreDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStoreDetailRoutingModule { }
