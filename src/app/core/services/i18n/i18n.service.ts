import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  public locale: BehaviorSubject<string> = new BehaviorSubject<string>("es");

  constructor() {
    this.initLocale();
  }

  private initLocale(): void {
    const localeLocalStorage = localStorage.getItem("locale");
    if (localeLocalStorage) {
      this.locale.next(localeLocalStorage);
    }
  }

  public changeLocale(locale: string): void {
    this.locale.next(locale);
  }

}
