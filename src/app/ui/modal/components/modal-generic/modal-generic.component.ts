import {
  ChangeDetectorRef,
  Component,
  ComponentRef, NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.css']
})
export class ModalGenericComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', {read: ViewContainerRef}) containerModal!: ViewContainerRef;
  public componentInstance!: ComponentRef<any> | null;

  public isOpen: boolean = false;
  public title: string = '';
  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private modalService: ModalService,
    private _cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.listenEvents();
  }

  private listenEvents(): void {
    this.modalService.startModal.pipe(
      takeUntil(this._subscriber)
    ).subscribe(data => {
      this.ngZone.run(() => {
        this.title = data.title;
        this.isOpen = true;
        this._cdr.detectChanges();
        this.componentInstance = this.containerModal.createComponent(data.component);
        this.componentInstance.instance.data = data.dataList;
        this.componentInstance.instance.dataGeneric = data.dataGeneric;
        this.componentInstance.instance.formGeneral = data.formGroup;
        this.componentInstance.instance.configForm = data.configForm;
        this.componentInstance.instance.eventName = data.event;
        this.componentInstance.instance.configLabels = data.configLabels;
        this.componentInstance.instance.dataAux = data.dataAux;
      });
    })
    this.modalService.finishModal.pipe(
      takeUntil(this._subscriber)
    ).subscribe(data => {
      this.isOpen = false;
    })
  }

  public closeModal(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
      this.componentInstance = null;
    }
    this.isOpen = false;
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }
}
