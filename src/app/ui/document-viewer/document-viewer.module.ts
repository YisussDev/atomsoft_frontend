import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';



@NgModule({
    declarations: [
        DocumentViewerComponent
    ],
    exports: [
        DocumentViewerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DocumentViewerModule { }
