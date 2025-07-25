import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigurationService {

  constructor(
    private translateService: TranslateService,
  ) {
  }

  public initTranslateGlobal(): void {
    this.translateService.use('es');
  }

}
