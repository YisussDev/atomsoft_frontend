import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {AsideActivateInterface} from "../interfaces/aside-activate.interface";
import {AsideFinishInterface} from "@ui/aside/interfaces/aside-finish.interface";

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  public openAside: Subject<AsideActivateInterface<any>> = new Subject<AsideActivateInterface<any>>();

  public closeAside: Subject<AsideFinishInterface<any>> = new Subject<AsideFinishInterface<any>>();

  constructor() {
  }

  public openAsideComponent(data: AsideActivateInterface<any>): void {
    this.openAside.next(data);
  }

  public closeAsideComponent(data?: any): void {
    this.closeAside.next(data);
  }

}
