import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesAdminComponent} from "@view/admin/pages-admin/pages-admin.component";

const routes: Routes = [
  {
    path: '',
    component: PagesAdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import("./page-home/page-home.module").then(m => m.PageHomeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import("./page-profile/page-profile.module").then(m => m.PageProfileModule)
      },
      {
        path: 'store',
        loadChildren: () => import("./page-store/page-store.module").then(m => m.PageStoreModule)
      },
      {
        path: '**', redirectTo: 'home'
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesAdminRoutingModule {
}
