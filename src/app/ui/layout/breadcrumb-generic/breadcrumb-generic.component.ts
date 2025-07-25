import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouteItemGeneral} from "@core-interfaces/routes/route-item-general.interface";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {routesGeneral} from "../../../application/routes/routes-general";
import {RouteService} from "@core-services/routes/route.service";

@Component({
  selector: 'app-breadcrumb-generic',
  templateUrl: './breadcrumb-generic.component.html',
  styleUrls: ['./breadcrumb-generic.component.css']
})
export class BreadcrumbGenericComponent implements OnInit, OnDestroy {

  private routesGeneral: { [key: string]: RouteItemGeneral } = routesGeneral;
  public breadcrumbConstruct: RouteItemGeneral[] = [];
  public lenghtBreadcrumbs: number = 0;
  private _subscriber: Subject<void> = new Subject<void>();
  public overBreadcrumb: boolean = false;

  constructor(
    private routeService: RouteService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.initListenRoute();
  }

  private initListenRoute(): void {
    this.routeService.sendDataRoute.pipe(
      takeUntil(this._subscriber)
    ).subscribe(argument => {
      if (argument.breadcrumbs) this.constructBreadcrumb(argument.breadcrumbs);
    });
  }

  private constructBreadcrumb(breadcrumbsCodes: string[]): void {
    let constructed: RouteItemGeneral[] = [];
    breadcrumbsCodes.forEach(breadcrumbCode => {
      if (this.routesGeneral[breadcrumbCode]) constructed.push(this.routesGeneral[breadcrumbCode]);
      if (this.routesGeneral[breadcrumbCode].path.includes(':')) {
        let pathDestructured: string[] = this.routesGeneral[breadcrumbCode].path.split('/');
        const pathActual: string[] = this._router.url.split('/');
        for (let index = 0; index < pathActual.length; index++) {
          pathDestructured[index] = pathActual[index];
        }
        constructed[constructed.length - 1].path = pathDestructured.join('/');
      }
    })
    if (constructed.length > 3) {
      this.overBreadcrumb = true;
      constructed.splice(0, constructed.length - 2)
      this.breadcrumbConstruct = constructed;
      this.lenghtBreadcrumbs = this.breadcrumbConstruct.length - 1;
      return;
    }
    this.breadcrumbConstruct = constructed;
    this.lenghtBreadcrumbs = this.breadcrumbConstruct.length - 1;
    this.overBreadcrumb = false;
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
