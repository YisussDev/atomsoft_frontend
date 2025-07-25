import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(
    private toastrService: ToastrService
  ) {}

  public success(message: string, title?: string) {
    this.toastrService.success(message, title);
  }

  public warning(message: string, title?: string) {
    this.toastrService.warning(message, title);
  }

  public error(message: string, title?: string) {
    this.toastrService.error(message, title);
  }

  public info(message: string, title?: string) {
    this.toastrService.info(message, title);
  }

  public showMessageUnactivity(): void {
    Swal.fire({
      html: `
        <div class="w-full flex justify-center gap-2 flex-col items-center">
                <div class="w-full flex justify-center p-3">
                  <img src="../../../../assets/img/utils/zzz.png" alt="otp_confirmed" class="object-scale-down" style="width: 150px; height: 150px">
                </div>
                <div>
                  <p class="text-btw font-light">¡Llevas mucho tiempo inactivo! por seguridad cerramos tu sesión.<br>
                    <b class="font-bold">Vuelve a iniciar sesión.</b>
                  </p>
                </div>
             </div>
        `,
      confirmButtonColor: 'var(--color-primary)'
    })
  }

}
