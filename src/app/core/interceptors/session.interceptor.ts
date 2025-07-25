import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class XSessionInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const session = localStorage.getItem('x-session');

    if (session) {
      const reqConfig = req.clone({
        headers: req.headers
          .set('x-session-id', session)
      });
      return next.handle(reqConfig);
    }

    return next.handle(req);
  }
}
