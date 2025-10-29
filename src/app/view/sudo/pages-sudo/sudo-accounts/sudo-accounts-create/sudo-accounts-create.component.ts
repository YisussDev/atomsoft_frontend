import {Component} from '@angular/core';
import {CreateAccountUseCase} from "@application/ports/in/account/create-account.use-case";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {NavigationService} from "@core/services/navigation/navigation.service";

@Component({
  selector: 'app-sudo-accounts-create',
  templateUrl: './sudo-accounts-create.component.html',
  styleUrls: ['./sudo-accounts-create.component.css']
})
export class SudoAccountsCreateComponent {

  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private navigationService: NavigationService,
  ) {
  }

  public onSubmit(event: Partial<AccountEntity>): void {
    this.createAccountUseCase.execute(event as AccountEntity).subscribe({
      next: (response) => {
        this.navigationService.navigateTo("/sudo/account/list");
      }
    });
  }

  public onCancel(): void {
    this.navigationService.navigateTo("/sudo/account/list");
  }

}
