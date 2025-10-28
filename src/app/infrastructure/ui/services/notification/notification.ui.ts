import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class NotificationUi {


  constructor(
    private toastrService: ToastrService
  ) {
  }

  public showSuccess(message: string, title?: string): void {
    this.toastrService.success(message, title);
  }

  public showInfo(message: string, title?: string): void {
    this.toastrService.info(message, title);
  }

  public showError(message: string, title?: string): void {
    this.toastrService.error(message, title);
  }

  public showWarning(message: string, title?: string): void {
    this.toastrService.warning(message, title);
  }

}
