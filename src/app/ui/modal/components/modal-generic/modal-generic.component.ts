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
import {ModalActivateInterface} from "@ui/modal/interfaces/modal-activate.interface";

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.css']
})
export class ModalGenericComponent implements OnInit, OnDestroy {

  @ViewChild("modalContainer", {read: ViewContainerRef}) containerModal!: ViewContainerRef;

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
    ).subscribe((event: ModalActivateInterface<any>) => {
      this.ngZone.run(() => {
        this.title = event.title;
        this.isOpen = true;
        this._cdr.detectChanges();
        this.componentInstance = this.containerModal.createComponent(event.component);
        this.componentInstance.instance.data = event.data;
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
