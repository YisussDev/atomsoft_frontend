import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public openSidebarEmit: Subject<void> = new Subject<void>();

  public closeSidebarEmit: Subject<void> = new Subject<void>();

  private _subscriber: Subject<void> = new Subject<void>();

  constructor() {
  }

  public openSidebar(): void {
    this.openSidebarEmit.next();
  }

  public closeSidebar(): void {
    this.closeSidebarEmit.next();
  }

}
