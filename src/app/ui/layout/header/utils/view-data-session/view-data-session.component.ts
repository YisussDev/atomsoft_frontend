import {Component, OnDestroy, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ThemeService} from "@core-services/theme/theme.service";
import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-data-session',
  templateUrl: './view-data-session.component.html',
  styleUrls: ['./view-data-session.component.css']
})
export class ViewDataSessionComponent implements OnInit, OnDestroy {

  public data!: any;
  public eventName!: string;
  public dataGeneric!: string;

  public themeActive: boolean = false;
  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    // private modalService: ModalService,
    private toastrService: ToastrService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initListenTheme();
  }

  public changeTheme(status: 0 | 1): void {
    this.themeService.changeTheme();
  }

  private initListenTheme(): void {
    this.themeService.themeActive.pipe(
      takeUntil(this._subscriber)
    ).subscribe(status => {
      this.themeActive = status;
    });
  }

  public closeSession(): void {
    Swal.fire({
      icon: 'question',
      title: 'Confirmación',
      text: '¿Desea cerrar sesión?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('data-account');
        localStorage.removeItem('x-config');
        localStorage.removeItem('x-token');
        this.toastrService.info('Has cerrado sesión correctamente.', 'Cierre de sesión');
        this._router.navigateByUrl('/auth/login', {replaceUrl: false, onSameUrlNavigation: "reload"});
      } else {

      }
    })
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
