import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FindAllAccountUseCase} from "@application/ports/in/account/find-all-account.use-case";
import {AccountEntity} from "@domain/entities/account/account.entity";
import {PaginationConfig, TableColumn} from "@ui/tables/table-generic/table-generic.component";
import {NavigationService} from "@core/services/navigation/navigation.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sudo-accounts-list',
  templateUrl: './sudo-accounts-list.component.html',
  styleUrls: ['./sudo-accounts-list.component.css']
})
export class SudoAccountsListComponent implements OnInit {

  public tableData: AccountEntity[] = [];

  public tableColumns: TableColumn[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true
    },
    {
      key: 'name',
      header: 'Nombres',
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true
    },
    {
      key: 'username',
      header: 'Nombre de usuario',
      sortable: true
    },
    {
      key: 'active',
      header: 'Estado',
      sortable: true
    },
    {
      key: 'two_factor_auth',
      header: 'Auth Doble Factor',
      sortable: true
    },
    {
      key: 'acciones',
      header: 'Acciones',
      sortable: false
    }
  ];

  public page: number = 1;
  public limit: number = 10;
  public totalFounded: number = 0;

  constructor(
    private findAllAccountUseCase: FindAllAccountUseCase,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.initAccounts({});
  }

  private initAccounts(query: { [key: string]: string | number }): void {
    const queryComplete: { [key: string]: string | number } = {
      limit: this.limit,
      page: this.page,
      ...query
    }
    this.findAllAccountUseCase.execute(queryComplete).subscribe({
      next: (response) => {
        console.log(response);
        this.tableData = response.data;
        this.page = response.pageActual || 1;
        this.limit = response.limitActual || 10;
        this.totalFounded = response.totalFounded || 0;
      }
    })
  }

  public onPageChange(page: number) {
    this.initAccounts({page: page});
  }

  public onSelect(event: string, data: AccountEntity): void {
    switch (event) {
      case "edit":
        this.eventUpdate(data);
        break;
    }
  }

  public eventUpdate(data: AccountEntity): void {
    Swal.fire({
      icon: "question",
      title: "Confirmación",
      text: `¿Deseas actualizar el usuario ${data.username}?`,
      confirmButtonText: "Actualizar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--color-primary)",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.navigationService.navigateTo(`/sudo/account/update/${data.id}`);
      }
    });
  }

}
