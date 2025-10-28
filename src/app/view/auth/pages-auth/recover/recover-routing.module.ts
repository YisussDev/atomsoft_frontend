import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecoverComponent} from "@view/auth/pages-auth/recover/recover.component";
import {RecoverSendCodeComponent} from "@view/auth/pages-auth/recover/recover-send-code/recover-send-code.component";
import {
  RecoverResetPasswordComponent
} from "@view/auth/pages-auth/recover/recover-reset-password/recover-reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: RecoverComponent,
    children: [
      {
        path: "",
        component: RecoverSendCodeComponent
      },
      {
        path: ":tokenRecover/:email",
        component: RecoverResetPasswordComponent
      },
      {
        path: "**", redirectTo: ""
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
export class RecoverRoutingModule {
}
