import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigationService {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  public navigateTo(url: string): Promise<boolean> {
    return this._router.navigateByUrl(url);
  }

  public navigate(commands: any[], extras?: any): Promise<boolean> {
    return this._router.navigate(commands, extras);
  }

  public navigateToBackOffice() {
    return this._router.navigateByUrl('/back-office');
  }

  public navigateToClient() {
    return this._router.navigateByUrl('/client');
  }

  public navigateToRegister() {
    return this._router.navigateByUrl('/auth/register');
  }

  public navigateToLogin() {
    return this._router.navigateByUrl('/auth/login');
  }

  public extractParamsRouteActual(): { [key: string]: any; } {
    return this._activatedRoute.snapshot.params;
  }

}
