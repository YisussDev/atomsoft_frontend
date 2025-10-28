import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileConfigurationRoutingModule} from './profile-configuration-routing.module';
import {ProfileConfigurationComponent} from './profile-configuration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BoxModule} from "@ui/box/box.module";
import {ConfigurationDataComponent} from './configuration-data/configuration-data.component';
import {ConfigurationNotificationComponent} from './configuration-notification/configuration-notification.component';
import {InputsModule} from "@ui/inputs/inputs.module";
import {ConfigurationSessionsComponent} from './configuration-sessions/configuration-sessions.component';
import {AuthCompositionModule} from "../../../../../composition/auth/auth.composition.module";
import {AccountCompositionModule} from "../../../../../composition/account/account.composition.module";
import {ConfigurationSecurityComponent} from './configuration-security/configuration-security.component';
import {RecoverCompositionModule} from "../../../../../composition/recover/recover.composition.module";
import {TypographyModule} from "@core/directives/typography/typography.module";
import {TabModule} from "@ui/tab/tab.module";


@NgModule({
  declarations: [
    ProfileConfigurationComponent,
    ConfigurationDataComponent,
    ConfigurationNotificationComponent,
    ConfigurationSessionsComponent,
    ConfigurationSecurityComponent
  ],
  imports: [
    CommonModule,
    ProfileConfigurationRoutingModule,
    ReactiveFormsModule,
    BoxModule,
    InputsModule,
    AuthCompositionModule,
    AccountCompositionModule,
    RecoverCompositionModule,
    TypographyModule,
    TabModule
  ]
})
export class ProfileConfigurationModule {
}
