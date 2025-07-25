import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModalService} from "@ui/modal/services/modal.service";
import Swal from "sweetalert2";
import * as moment from "moment";

@Injectable()
export class ExpirationInterceptor implements HttpInterceptor {

  private pathsExcludes: string[] = [
    '/register',
    '/login',
    'validate-email',
    'verify-login',
    'verify/login',
  ]

  constructor(
    private toastrService: ToastrService,
    private modalService: ModalService,
    private _router: Router
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.validatePath(req.url, this.pathsExcludes)) {
      return next.handle(req);
    }

    const dataLocalLastMomentLogin = localStorage.getItem('last-login');
    if (!dataLocalLastMomentLogin) {
      const reqInvalid = req.clone({
        headers: req.headers
          .set('hidden-toast', 'true')
      });
      this._router.navigateByUrl('/auth/login');
      localStorage.removeItem('x-token');
      return next.handle(reqInvalid);
    }
    const momentLastLogin = moment(dataLocalLastMomentLogin).format();
    const momentActual = moment().format();
    const isValidInfo = moment(momentLastLogin).add(30, 'minutes').isAfter(momentActual);
    if (!isValidInfo) {
      // this.toastrService.info('Sesión expirada, vuelve a iniciar sesión...');
      Swal.fire({
        html: `
        <div class="w-full flex justify-center gap-2 flex-col items-center">
                <div class="w-full flex justify-center p-3">
                  <img src="assets/img/utils/zzz.webp" alt="otp_confirmed" class="object-scale-down" style="width: 150px; height: 150px">
                </div>
                <div>
                  <p class="text-btw font-light">¡Llevas mucho tiempo inactivo! por seguridad cerramos tu sesión.<br>
                    <b class="font-bold">Vuelve a iniciar sesión.</b>
                  </p>
                </div>
             </div>
        `,
        confirmButtonColor: 'var(--color-primary)'
      })
      localStorage.removeItem('x-token');
      localStorage.removeItem('last-login');
      const reqInvalid = req.clone({
        headers: req.headers
          .set('hidden-toast', 'true')
      });
      this._router.navigateByUrl('/auth/login');
      return next.handle(reqInvalid);
    } else {
      localStorage.setItem('last-login', moment().format());
      return next.handle(req);
    }
  }

  public validatePath(urlReq: string, pathList: string[]): boolean {
    let isValid: boolean = false;
    for (const pathItem of pathList) {
      if (urlReq.endsWith(pathItem)) isValid = true;
    }
    return isValid;
  }

}
