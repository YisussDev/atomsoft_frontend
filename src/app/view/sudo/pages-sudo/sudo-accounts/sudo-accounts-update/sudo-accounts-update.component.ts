import {Component, OnInit} from '@angular/core';
import {FindOneAccountUseCase} from "@application/ports/in/account/find-one-account.use-case";
import {NavigationService} from "@core/services/navigation/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NotificationService} from "@core/services/notification/notification.service";
import {UpdateAccountUseCase} from "@application/ports/in/account/update-account.use-case";

@Component({
  selector: 'app-sudo-accounts-update',
  templateUrl: './sudo-accounts-update.component.html',
  styleUrls: ['./sudo-accounts-update.component.css']
})
export class SudoAccountsUpdateComponent implements OnInit {

  private accountId!: string;
  public dataToUpdate!: AccountEntity;

  constructor(
    private findOneAccountUseCase: FindOneAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
    private navigationService: NavigationService,
    private notificationService: NotificationService,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.extractParams();
    this.initDataToUpdate();
  }

  private extractParams(): void {
    const {accountId} = this._activatedRoute.snapshot.params;
    this.accountId = accountId;
  }

  private initDataToUpdate(): void {
    this.findOneAccountUseCase.execute({id: this.accountId}).subscribe({
      next: (response) => {
        if (!response.data) {
          this.navigationService.navigateTo("/sudo/account/list");
          this.notificationService.info("Account not found!");
        }
        if (response.data) {
          this.dataToUpdate = response.data;
        }
      }
    })
  }

  public onSubmit(event: Partial<AccountEntity>): void {
    this.updateAccountUseCase.execute(this.accountId, event).subscribe({
      next: (response) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  public onCancel(): void {
    this.navigationService.navigateTo("/sudo/account/list");
  }

}
