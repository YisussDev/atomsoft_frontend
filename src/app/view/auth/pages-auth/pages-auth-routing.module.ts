import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesAuthComponent} from "@view/auth/pages-auth/pages-auth.component";
import {TwoFactorGuard} from "@application/guards/auth/two-factor.guard";
import {AuthGuard} from "@application/guards/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: PagesAuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'recover',
        loadChildren: () => import('./recover/recover.module').then(m => m.RecoverModule)
      },
      {
        path: 'two-factor-auth',
        loadChildren: () => import('./two-factor-auth/two-factor-auth.module').then(m => m.TwoFactorAuthModule),
        canActivate: [TwoFactorGuard]
      },
      {
        path: "**", redirectTo: "login"
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
export class PagesAuthRoutingModule {
}
