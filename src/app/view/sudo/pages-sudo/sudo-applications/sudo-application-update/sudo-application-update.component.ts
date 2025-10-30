import {Component, OnInit} from '@angular/core';
import {NavigationService} from "@core/services/navigation/navigation.service";
import {NotificationService} from "@core/services/notification/notification.service";
import {ActivatedRoute} from "@angular/router";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {FindOneApplicationUseCase} from "@application/ports/in/application/find-one-application.use-case";
import {UpdateApplicationUseCase} from "@application/ports/in/application/update-application.use-case";

@Component({
  selector: 'app-sudo-application-update',
  templateUrl: './sudo-application-update.component.html',
  styleUrls: ['./sudo-application-update.component.css']
})
export class SudoApplicationUpdateComponent implements OnInit {

  private applicationId!: string;
  public dataToUpdate!: ApplicationEntity;

  constructor(
    private findOneApplicationUseCase: FindOneApplicationUseCase,
    private updateApplicationUseCase: UpdateApplicationUseCase,
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
    const {applicationId} = this._activatedRoute.snapshot.params;
    this.applicationId = applicationId;
  }

  private initDataToUpdate(): void {
    const query: { [key: string]: string | number } = {
      id: this.applicationId,
      includes: "plans"
    }
    this.findOneApplicationUseCase.execute(query).subscribe({
      next: (response) => {
        if (!response.data) {
          this.navigationService.navigateTo("/sudo/account/list");
          this.notificationService.info("Application not found!");
        }
        if (response.data) {
          console.log(response.data)
          this.dataToUpdate = response.data;
        }
      }
    })
  }

  public onSubmit(event: Partial<ApplicationEntity>): void {
    this.updateApplicationUseCase.execute(this.applicationId, event as ApplicationEntity).subscribe({
      next: (response) => {
        this.navigationService.navigateTo("/sudo/application/list");
        this.notificationService.success("Application updated successfully.!");
      }
    })
  }

  public onCancel(): void {
    this.navigationService.navigateTo("/sudo/account/list");
  }
}
