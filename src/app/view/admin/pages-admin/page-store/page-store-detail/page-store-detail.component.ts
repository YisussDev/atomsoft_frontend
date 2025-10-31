import {Component, OnInit} from '@angular/core';
import {ApplicationEntity} from "@domain/entities/application/application.entity";
import {FindOneApplicationUseCase} from "@application/ports/in/application/find-one-application.use-case";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-store-detail',
  templateUrl: './page-store-detail.component.html',
  styleUrls: ['./page-store-detail.component.css']
})
export class PageStoreDetailComponent implements OnInit {

  public app = {
    id: 1,
    name: "Office Suite",
    developer: "Microsoft Corporation",
    icon: "📝",
    rating: 4.6,
    reviews: "125K",
    price: "Gratis",
    category: "Productividad",
    description: "Suite completa de productividad que incluye procesador de textos, hojas de cálculo y presentaciones. Perfecta para estudiantes y profesionales que buscan crear documentos de alta calidad.",
    features: [
      "Edición de documentos en tiempo real",
      "Colaboración en la nube",
      "Plantillas profesionales",
      "Compatible con todos los formatos",
      "Guardado automático"
    ],
    screenshots: ["📄", "📊", "📈", "💼", "🖼️"],
    size: "450 MB",
    version: "2024.1.0",
    updated: "Hace 1 semana"
  };

  public appPrincipal!: ApplicationEntity;

  private applicationId!: string;

  public isVisibleModalScreenshot: boolean = false;

  public chipViewing!: string;

  constructor(
    private findOneApplicationUseCase: FindOneApplicationUseCase,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.extractParams();
    this.initApplication();
  }

  private extractParams(): void {
    const {applicationId} = this._activatedRoute.snapshot.params;
    this.applicationId = applicationId;
  }

  private initApplication(): void {
    this.findOneApplicationUseCase.execute({id: this.applicationId, includes: "plans"}).subscribe({
      next: (response) => {
        if (response.data) {
          this.appPrincipal = response.data;
        }
      }
    });
  }

  public openModalViewChip(chip: string): void {
    this.chipViewing = chip;
    this.isVisibleModalScreenshot = true;
  }

}
