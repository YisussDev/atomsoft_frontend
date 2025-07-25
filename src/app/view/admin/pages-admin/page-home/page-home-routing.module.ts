import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageHomeComponent} from "@view/admin/pages-admin/page-home/page-home.component";

const routes: Routes = [
  {
    path: "",
    component: PageHomeComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageHomeRoutingModule {
}
