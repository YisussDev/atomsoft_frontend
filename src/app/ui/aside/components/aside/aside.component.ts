import {ChangeDetectorRef, Component, ComponentRef, NgZone, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {fromEvent, Subject, takeUntil} from "rxjs";
import {AsideService} from "../../services/aside.service";
import {AsideConfigurationInterface} from "@ui/aside/interfaces/aside-activate.interface";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @ViewChild('asideContainer', {read: ViewContainerRef}) containerModal!: ViewContainerRef;

  public componentInstance!: ComponentRef<any> | null;
  public visible: boolean = false;
  public title: string = '';
  public closing: boolean = false;
  public configurationAside: AsideConfigurationInterface = {
    position: 'right'
  };

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private asideService: AsideService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // this.initListenOpenClose();
    this.listenEvents();
  }

  public listenEvents(): void {
    this.asideService.openAside.pipe(
      takeUntil(this._subscriber)
    ).subscribe(eventData => {
      this.ngZone.run(() => {
        this.title = eventData.title;
        if (eventData.config) this.configurationAside = eventData.config;
        this.visible = true;
        this.cdr.detectChanges();
        this.componentInstance = this.containerModal.createComponent(eventData.component);
        this.componentInstance.instance.data = eventData.data;
        this.componentInstance.instance.eventName = eventData.eventName;
      });
    });
    fromEvent(document, 'keydown').pipe(
      takeUntil(this._subscriber)
    ).subscribe((event: any) => {
      if (this.visible) {
        if (event.keyCode == 27) {
          this.asideService.closeAside.next({data: null, eventName: ''});
        }
      }
    })
    this.asideService.closeAside.pipe(
      takeUntil(this._subscriber)
    ).subscribe(data => {
      this.closing = true;
      setTimeout(() => {
        this.visible = false;
        this.closing = false;
      }, 300)
    })
  }

  public closeAside(): void {
    this.asideService.closeAsideComponent();
  }

}
