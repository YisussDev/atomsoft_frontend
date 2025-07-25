import {Injectable} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, map, Observable} from "rxjs";
import {RouteArgument} from "../../interfaces/routes/route-argument";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  public sendDataRoute: BehaviorSubject<RouteArgument> = new BehaviorSubject<RouteArgument>(
    {
      titleHeader: undefined,
      breadcrumbs: undefined,
      title: undefined,
      pathToRedirect: undefined
    }
  );
  public sendDataRouteDynamic: BehaviorSubject<RouteArgument> = new BehaviorSubject<RouteArgument>(
    {
      titleHeader: undefined,
      breadcrumbs: undefined,
      title: undefined,
      pathToRedirect: undefined
    }
  );

  constructor(
    private router: Router
  ) {
    this.routeParams();
  }

  public getRouteArguments(): Observable<RouteArgument> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter(event => (event as ActivationEnd).snapshot.firstChild === null),
      map(event => {
        const {data, params} = (event as ActivationEnd).snapshot
        data['params'] = params;
        return data;
      })
    );
  };

  public getRouteArgumentsDynamic(): Observable<RouteArgument> {
    return this.sendDataRouteDynamic;
  };

  private routeParams() {
    this.getRouteArguments().subscribe({
      next: (routeArguments) => {
        const dataRoute: RouteArgument = {
          titleHeader: undefined,
          breadcrumbs: undefined,
          title: undefined,
          pathToRedirect: undefined
        };
        if (routeArguments.title) {
          dataRoute['title'] = routeArguments.title;
        }
        if (routeArguments.breadcrumbs) {
          dataRoute['breadcrumbs'] = routeArguments.breadcrumbs;
        }
        if (routeArguments.titleHeader) {
          dataRoute['titleHeader'] = routeArguments.titleHeader;
        }
        if (routeArguments.pathToRedirect) {
          dataRoute['pathToRedirect'] = routeArguments.pathToRedirect;
        }
        this.sendDataRoute.next(dataRoute);
      }
    });
    this.getRouteArgumentsDynamic().subscribe({
      next: (routeArguments) => {
        const dataRoute: RouteArgument = {
          titleHeader: undefined,
          breadcrumbs: undefined,
          title: undefined,
          pathToRedirect: undefined
        };
        if (routeArguments.title) {
          dataRoute['title'] = routeArguments.title;
        }
        if (routeArguments.breadcrumbs) {
          dataRoute['breadcrumbs'] = routeArguments.breadcrumbs;
        }
        if (routeArguments.titleHeader) {
          dataRoute['titleHeader'] = routeArguments.titleHeader;
        }
        if (routeArguments.pathToRedirect) {
          dataRoute['pathToRedirect'] = routeArguments.pathToRedirect;
        }
        this.sendDataRoute.next(dataRoute);
      }
    });
  }

}
