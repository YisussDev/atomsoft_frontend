import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesAuthComponent} from "./pages-auth/pages-auth.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages-auth/pages-auth.module').then(m => m.PagesAuthModule),
    component: PagesAuthComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
