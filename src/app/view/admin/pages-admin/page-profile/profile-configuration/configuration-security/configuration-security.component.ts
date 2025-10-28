import {Component, Input} from '@angular/core';
import {AccountEntity} from "@domain/entities/account/account.entity";
import {RecoverAccountUseCase} from "@application/ports/in/recover/recover-account.use-case";
import {UpdateAccountUseCase} from "@application/ports/in/account/update-account.use-case";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-configuration-security',
  templateUrl: './configuration-security.component.html',
  styleUrls: ['./configuration-security.component.css']
})
export class ConfigurationSecurityComponent {

  @Input() public account!: AccountEntity;

  constructor(
    private recoverAccountUseCase: RecoverAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
    private _cacheStorage: CacheStorage,
  ) {
  }

  public openChangePassword(): void {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: "¿Deseas enviar un correo de recuperación?",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Enviar",
      confirmButtonColor: "var(--color-primary)",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        this.recoverAccountUseCase.execute(this.account.email).subscribe();
      }
    });
  }

  public toggleTwoFactor(): void {
    this.updateAccountUseCase.execute(this.account.id.toString(), {
      two_factor_auth: ((this.account.two_factor_auth == 1) ? 0 : 1)
    } as AccountEntity).subscribe({
      next: (response) => {
        this.account.two_factor_auth = this.account.two_factor_auth == 1 ? 0 : 1;
        this._cacheStorage.setByKey("_account_data", this.account);
      }
    });
  }

}
