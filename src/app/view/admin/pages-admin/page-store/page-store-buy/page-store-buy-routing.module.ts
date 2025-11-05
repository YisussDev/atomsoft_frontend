import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageStoreBuyComponent} from "@view/admin/pages-admin/page-store/page-store-buy/page-store-buy.component";

const routes: Routes = [
  {
    path: "",
    component: PageStoreBuyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStoreBuyRoutingModule {

}
