import {Component} from '@angular/core';
import {NavigationService} from "@core/services/navigation/navigation.service";
import {CreateApplicationUseCase} from "@application/ports/in/application/create-application.use-case";
import {ApplicationEntity} from "@domain/entities/application/application.entity";

@Component({
  selector: 'app-sudo-application-create',
  templateUrl: './sudo-application-create.component.html',
  styleUrls: ['./sudo-application-create.component.css']
})
export class SudoApplicationCreateComponent {

  constructor(
    private createApplicationUseCase: CreateApplicationUseCase,
    private navigationService: NavigationService,
  ) {
  }

  public onSubmit(event: Partial<ApplicationEntity>): void {
    this.createApplicationUseCase.execute(event as ApplicationEntity).subscribe({
      next: (response) => {
        this.navigationService.navigateTo("/sudo/application/list");
      }
    });
  }

  public onCancel(): void {
    this.navigationService.navigateTo("/sudo/application/list");
  }


}
