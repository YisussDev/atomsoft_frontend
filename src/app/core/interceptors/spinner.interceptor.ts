import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {SpinnerService} from "../../ui/spinner/services/spinner.service";

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('wss://')) {
      this.spinnerService.on();
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (!event.url?.includes('wss://')) {
            this.spinnerService.off();
          }
        }
      }),
      catchError((error, response) => {
        this.spinnerService.off();
        return throwError(error);
      })
    );
  }
}
