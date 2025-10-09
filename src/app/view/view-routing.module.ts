import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@application/guards/auth/auth.guard";
import {AdminGuard} from "@application/guards/auth/admin.guard";
import {ViewComponent} from "@view/view.component";

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard]
      },
      {
        path: "**", redirectTo: "auth"
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
export class ViewRoutingModule {
}
