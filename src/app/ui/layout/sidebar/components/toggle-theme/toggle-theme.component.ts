import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {ThemeService} from "@core-services/theme/theme.service";

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.css']
})
export class ToggleThemeComponent implements OnInit, OnDestroy {

  public themeActive: boolean = false;

  private _subscriber: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit() {
    this.getStatusTheme();
  }

  private getStatusTheme(): void {
    this.themeService.themeActive.pipe(
      takeUntil(this._subscriber)
    ).subscribe(value => this.themeActive = value);
  }

  public setTheme(status: boolean): void {
    this.themeActive = status;
    this.themeService.changeTheme();
  }

  ngOnDestroy() {
    this._subscriber.next();
    this._subscriber.complete();
  }

}
