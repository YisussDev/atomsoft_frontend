import {Injectable, Output} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeActive: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.restoreTheme();
  }

  private restoreTheme(): void {
    const status = localStorage.getItem('dark-theme');
    if (status) this.themeActive.next(true);
  }

  public changeTheme(): void {
    if (!this.themeActive.value) {
      localStorage.setItem('dark-theme', JSON.stringify(true));
      this.themeActive.next(true);
    } else {
      localStorage.removeItem('dark-theme');
      this.themeActive.next(false);
    }
  }

}
