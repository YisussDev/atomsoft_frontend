import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesAdminRoutingModule } from './pages-admin-routing.module';
import { PagesAdminComponent } from './pages-admin.component';
import {AdminUiModule} from "@view/admin/admin-ui/admin-ui.module";


@NgModule({
  declarations: [
    PagesAdminComponent
  ],
  imports: [
    CommonModule,
    PagesAdminRoutingModule,
    AdminUiModule
  ]
})
export class PagesAdminModule { }
