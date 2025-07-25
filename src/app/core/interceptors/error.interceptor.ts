import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: ToastrService,
    private _router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error, response) => {
        const newToken: string | null = req.headers.get('X-Token');
        const showErrorToast: string | null = req.headers.get('hidden-toast');
        if (newToken) {
          localStorage.setItem('x-token', newToken);
        }
        if (error.error.code == 401) {
          this.toastrService.info("Sesión expirada o no válida.", 'Sesión no válida');
          localStorage.removeItem('data-account');
          localStorage.removeItem('x-token');
          this._router.navigateByUrl('/auth/login');
        }
        if (!showErrorToast) {
          this.toastrService.error(error.error.message, 'Error');
        }
        req.headers.delete('hidden-toast');
        return throwError(error);
      })
    );
  }

}
