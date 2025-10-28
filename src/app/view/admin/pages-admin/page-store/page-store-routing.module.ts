import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageStoreComponent} from "@view/admin/pages-admin/page-store/page-store.component";

const routes: Routes = [
  {
    path: "",
    component: PageStoreComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./page-store-home/page-store-home.module").then(m => m.PageStoreHomeModule),
      },
      {
        path: "detail/:id",
        loadChildren: () => import("./page-store-detail/page-store-detail.module").then(m => m.PageStoreDetailModule),
      }
    ]
  },
  {
    path: "**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStoreRoutingModule {
}
