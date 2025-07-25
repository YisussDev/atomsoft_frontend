import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private pathExcludes: string[] = [
    "api/account/login",
    "api/account/login/google",
  ];

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.validatePath(req.url, this.pathExcludes)) {
      console.log("Es excluido...");
      return next.handle(req);
    } else {
      console.log("No es excluido...");
      const token = localStorage.getItem("x-token");
      const authReq = req.clone({
        headers: req.headers
          .set('authorization', `Bearer ${token}`)
          .set('x-socket-id', 'default')
      });
      return next.handle(authReq);
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
