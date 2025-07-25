import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchSimpleComponent } from './switch-simple/switch-simple.component';



@NgModule({
    declarations: [
        SwitchSimpleComponent
    ],
    exports: [
        SwitchSimpleComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SwitchModule { }
