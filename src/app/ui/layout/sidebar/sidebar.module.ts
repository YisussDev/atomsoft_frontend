import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar.component";
import {FieldSidebarComponent} from "./components/field-sidebar/field-sidebar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ToggleThemeComponent} from "./components/toggle-theme/toggle-theme.component";


@NgModule({
  declarations: [
    SidebarComponent,
    FieldSidebarComponent,
    ToggleThemeComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
  ]
})
export class SidebarModule {
}
