import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDetailRoutingModule } from './profile-detail-routing.module';
import { ProfileDetailComponent } from './profile-detail.component';
import {TypographyModule} from "@core/directives/typography/typography.module";


@NgModule({
  declarations: [
    ProfileDetailComponent
  ],
    imports: [
        CommonModule,
        ProfileDetailRoutingModule,
        TypographyModule
    ]
})
export class ProfileDetailModule { }
