import {Injectable, Output} from '@angular/core';
import {Subject} from "rxjs";
import {ModalActivateInterface} from "../interfaces/modal-activate.interface";
import {ModalFinishInterface} from "@ui/modal/interfaces/modal-finish.interface";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  @Output() finishModal: Subject<ModalFinishInterface<any>> = new Subject<ModalFinishInterface<any>>();
  @Output() startModal: Subject<ModalActivateInterface<any>> = new Subject<ModalActivateInterface<any>>();

  constructor() {
  }


  public openModal(configModal: ModalActivateInterface<any>): void {
    this.startModal.next(configModal);
  }

  public closeModal(data: ModalFinishInterface<any>): void {
    this.finishModal.next(data);
  }


}
