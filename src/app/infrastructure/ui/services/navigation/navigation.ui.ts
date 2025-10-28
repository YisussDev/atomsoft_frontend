import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavigationUi {

  public urlHomePrefix: string = "/home/";
  public urlAuthPrefix: string = "/auth/";
  public urlAdminPrefix: string = "/admin/";
  public urlStorePrefix: string = "/store/";

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  public goToHome(): Promise<boolean> {
    return this._router.navigateByUrl(this.urlHomePrefix);
  }

  public goToAuth(): Promise<boolean> {
    return this._router.navigateByUrl(this.urlAuthPrefix);
  }

  public goToAdmin(): Promise<boolean> {
    return this._router.navigateByUrl(this.urlAdminPrefix);
  }

  public goToStore(): Promise<boolean> {
    return this._router.navigateByUrl(this.urlStorePrefix);
  }

  public goToUrl(url: string): void {
    this._router.navigateByUrl(url);
  }

  public extractParamFromUrl(nameParam: string): string | undefined {
    const {params} = this._activatedRoute.snapshot;
    return params[nameParam];
  }

  public subscribeParamsFromUrl(): Observable<any> {
    return this._activatedRoute.params;
  }

}
