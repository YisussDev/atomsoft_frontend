import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "@core/services/routes/route.service";
import {ThemeService} from "@core/services/theme/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
