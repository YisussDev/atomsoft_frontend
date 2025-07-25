import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class XConfigInterceptor implements HttpInterceptor {

  private pathsExcludes: string[] = [
    'customer-register'
  ]

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const config = localStorage.getItem('x-config');

    if (this.validatePath(req.url, this.pathsExcludes)) {
      return next.handle(req);
    }

    if (config) {
      const reqConfig = req.clone({
        headers: req.headers
          .set('x-config', config)
      });
      return next.handle(reqConfig);
    }

    return next.handle(req);
  }

  public validatePath(urlReq: string, pathList: string[]): boolean {
    let isValid: boolean = false;
    for (const pathItem of pathList) {
      if (urlReq.includes(pathItem)) isValid = true;
    }
    return isValid;
  }

}
