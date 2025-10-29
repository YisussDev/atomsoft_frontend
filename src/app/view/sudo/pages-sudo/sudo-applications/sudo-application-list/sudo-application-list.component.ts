import {Component, OnInit} from '@angular/core';
import {TableColumn} from "@ui/tables/table-generic/table-generic.component";
import {NavigationService} from "@core/services/navigation/navigation.service";
import Swal from "sweetalert2";
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {FindAllApplicationUseCase} from "@application/ports/in/application/find-all-application.use-case";
import {DeleteApplicationUseCase} from "@application/ports/in/application/delete-application.use-case";

@Component({
  selector: 'app-sudo-application-list',
  templateUrl: './sudo-application-list.component.html',
  styleUrls: ['./sudo-application-list.component.css']
})
export class SudoApplicationListComponent implements OnInit {

  public tableData: ApplicationEntity[] = [];

  public tableColumns: TableColumn[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true
    },
    {
      key: 'logo_url',
      header: 'Logo',
      sortable: false
    },
    {
      key: 'name',
      header: 'Nombres',
      sortable: true
    },
    {
      key: 'price',
      header: 'Precio',
      sortable: true
    },
    {
      key: 'recursive_payment',
      header: 'Recurrente',
      sortable: true
    },
    {
      key: 'acciones',
      header: 'Precio',
      sortable: true
    },
  ];

  public page: number = 1;
  public limit: number = 10;
  public totalFounded: number = 0;

  constructor(
    private findAllApplicationUseCase: FindAllApplicationUseCase,
    private deleteApplicationUseCase: DeleteApplicationUseCase,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.initApplications({});
  }

  private initApplications(query: { [key: string]: string | number }): void {
    const queryComplete: { [key: string]: string | number } = {
      limit: this.limit,
      page: this.page,
      ...query
    }
    this.findAllApplicationUseCase.execute(queryComplete).subscribe({
      next: (response) => {
        this.tableData = response.data;
        this.page = response.pageActual || 1;
        this.limit = response.limitActual || 10;
        this.totalFounded = response.totalFounded || 0;
      }
    })
  }

  public onPageChange(page: number) {
    this.initApplications({page: page});
  }

  public onSelect(event: string, data: ApplicationEntity): void {
    switch (event) {
      case "edit":
        this.eventUpdate(data);
        break;
      case "delete":
        this.eventDelete(data);
        break;
    }
  }

  public eventUpdate(data: ApplicationEntity): void {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: `¿Deseas actualizar la aplicación ${data.name}?`,
      confirmButtonText: "Actualizar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--color-primary)",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.navigationService.navigateTo(`/sudo/application/update/${data.id}`);
      }
    });
  }

  public eventDelete(data: ApplicationEntity): void {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: `¿Deseas eliminar ${data.name}?`,
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--color-primary)",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.deleteApplicationUseCase.execute(data.id.toString()).subscribe({
          next: (response) => {
            this.initApplications({});
          }
        })
      }
    });
  }

}
