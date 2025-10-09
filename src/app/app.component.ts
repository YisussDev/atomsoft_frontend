import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "@core/services/routes/route.service";
import {ThemeService} from "@core/services/theme/theme.service";

@Component({
  selector: 'app-root',
  template: `
    <div class="transition-colors ease-out duration-500 min-h-screen bg-btw-secondary"
         [ngClass]="{'dark-theme': themeActive}">
      <router-outlet></router-outlet>
    </div>
    <div class="fixed right-5 bottom-5 flex flex-col-reverse gap-1 z-30">
      <button
        class="h-12 w-12 border border-btw rounded-full flex justify-center items-center bg-btw-primary shadow-md text-btw text-2xl"
        (click)="changeTheme()">
          <span>
            <i class="fa fa-solid" [ngClass]="{'fa-sun': themeActive, 'fa-moon': !themeActive,}">
            </i>
          </span>
      </button>
    </div>
    <app-spinner></app-spinner>
  `
})
export class AppComponent implements OnInit {

  public themeActive: boolean = false;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private routeService: RouteService,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit() {
    this.initThemeService();
  }

  private initThemeService(): void {
    this.themeService.themeActive.pipe(
      takeUntil(this._subscriber)
    ).subscribe(status => {
      this.themeActive = status;
    });
  }

  public changeTheme(): void {
    this.themeService.changeTheme();
  }

}
