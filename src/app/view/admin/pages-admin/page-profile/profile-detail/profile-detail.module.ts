import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDetailRoutingModule } from './profile-detail-routing.module';
import { ProfileDetailComponent } from './profile-detail.component';


@NgModule({
  declarations: [
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    ProfileDetailRoutingModule
  ]
})
export class ProfileDetailModule { }
