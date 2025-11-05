import { Component } from '@angular/core';
import {ApplicationPlanEntity} from "@domain/entities/application-plan/application-plan.entity";

@Component({
  selector: 'app-page-store-buy',
  templateUrl: './page-store-buy.component.html',
  styleUrls: ['./page-store-buy.component.css']
})
export class PageStoreBuyComponent {


  // @ts-ignore
  plans: ApplicationPlanEntity[] = [
    // @ts-ignore
    {
      id: 1,
      code: 'BASIC',
      name: 'Plan Básico',
      description: 'Ideal para empezar y probar nuestra plataforma.',
      price: 0,
      limit_account: 1,
      currency: 'USD',
      chips: ['Rápido', 'Fácil'],
      config: "",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    },
    // @ts-ignore
    {
      id: 2,
      code: 'STANDARD',
      name: 'Plan Estándar',
      description: 'Perfecto para equipos pequeños.',
      price: 49,
      limit_account: 5,
      currency: 'USD',
      chips: ['Flexible', 'Colaborativo'],
      config: "",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    },
    // @ts-ignore
    {
      id: 3,
      code: 'PREMIUM',
      name: 'Plan Premium',
      description: 'Para empresas que necesitan todas las funcionalidades.',
      price: 99,
      limit_account: 20,
      currency: 'USD',
      chips: ['Avanzado', 'Soporte 24/7'],
      config: "",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    },
  ];

  selectedPlanId?: number;

  selectPlan(plan: ApplicationPlanEntity) {
    this.selectedPlanId = plan.id;
    console.log('Plan seleccionado:', plan);
    // Aquí podrías llamar a un servicio para iniciar la prueba gratuita
  }

}
