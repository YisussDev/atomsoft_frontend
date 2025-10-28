import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './otp/otp.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OtpComponent
  ],
  exports: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OtpModule { }
