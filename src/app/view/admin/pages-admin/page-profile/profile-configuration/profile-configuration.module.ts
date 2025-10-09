import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileConfigurationRoutingModule} from './profile-configuration-routing.module';
import {ProfileConfigurationComponent} from './profile-configuration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BoxModule} from "@ui/box/box.module";
import {ConfigurationDataComponent} from './configuration-data/configuration-data.component';
import {ConfigurationNotificationComponent} from './configuration-notification/configuration-notification.component';
import {InputsModule} from "@ui/inputs/inputs.module";
import { ConfigurationSessionsComponent } from './configuration-sessions/configuration-sessions.component';


@NgModule({
  declarations: [
    ProfileConfigurationComponent,
    ConfigurationDataComponent,
    ConfigurationNotificationComponent,
    ConfigurationSessionsComponent
  ],
  imports: [
    CommonModule,
    ProfileConfigurationRoutingModule,
    ReactiveFormsModule,
    BoxModule,
    InputsModule,
  ]
})
export class ProfileConfigurationModule {
}
