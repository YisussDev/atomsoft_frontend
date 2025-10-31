import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageStoreDetailRoutingModule } from './page-store-detail-routing.module';
import { PageStoreDetailComponent } from './page-store-detail.component';
import {TypographyModule} from "@core/directives/typography/typography.module";
import {ModalModule} from "@ui/modal/modal.module";
import {DocumentViewerModule} from "@ui/document-viewer/document-viewer.module";


@NgModule({
  declarations: [
    PageStoreDetailComponent
  ],
  imports: [
    CommonModule,
    PageStoreDetailRoutingModule,
    TypographyModule,
    ModalModule,
    DocumentViewerModule
  ]
})
export class PageStoreDetailModule { }
