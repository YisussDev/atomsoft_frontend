import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home-banners-last',
  templateUrl: './home-banners-last.component.html',
  styleUrls: ['./home-banners-last.component.css']
})
export class HomeBannersLastComponent implements OnInit, AfterViewInit {

  @ViewChild("praxiTemplate") public praxiTemplateRef!: TemplateRef<any>;
  @ViewChild("praxiEduTemplate") public praxiEduTemplateRef!: TemplateRef<any>;

  banners: { template: TemplateRef<any> }[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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
