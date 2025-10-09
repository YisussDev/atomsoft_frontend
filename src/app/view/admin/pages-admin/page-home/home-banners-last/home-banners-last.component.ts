import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-home-banners-last',
  templateUrl: './home-banners-last.component.html',
  styleUrls: ['./home-banners-last.component.css']
})
export class HomeBannersLastComponent implements OnInit, AfterViewInit {

  @ViewChild("praxiTemplate") public praxiTemplateRef!: TemplateRef<any>;
  @ViewChild("praxiEduTemplate") public praxiEduTemplateRef!: TemplateRef<any>;

  banners: any[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // console.log(this.praxiTemplateRef)
  }

  ngAfterViewInit() {
    // console.log(this.praxiTemplateRef)
    this.banners = [
      {
        template: this.praxiTemplateRef
      },
      {
        template: this.praxiEduTemplateRef
      },
    ];
    this._cdr.detectChanges();
  }

}
