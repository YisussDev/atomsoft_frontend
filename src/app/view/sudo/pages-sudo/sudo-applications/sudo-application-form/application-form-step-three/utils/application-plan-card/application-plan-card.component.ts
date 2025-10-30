import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationPlanEntity} from "@domain/entities/application-plan/application-plan.entity";
import Swal from "sweetalert2";

@Component({
  selector: 'app-application-plan-card',
  templateUrl: './application-plan-card.component.html',
  styleUrls: ['./application-plan-card.component.css']
})
export class ApplicationPlanCardComponent {

  @Input() plan!: ApplicationPlanEntity;
  @Output() onEdit = new EventEmitter<ApplicationPlanEntity>();
  @Output() onDelete = new EventEmitter<ApplicationPlanEntity>();

  handleDelete(): void {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Deseas eliminar el plan ${this.plan.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.onDelete.emit(this.plan);
      }
    });
  }

}
